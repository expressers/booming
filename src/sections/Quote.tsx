import { useState, type FormEvent } from 'react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { BUILDING_TYPES, CONTACT, SERVICES } from '../config'

type Fields = {
  nome: string
  empresa: string
  telefone: string
  servico: string
  edificio: string
  andares: string
  local: string
  mensagem: string
}

const empty: Fields = {
  nome: '',
  empresa: '',
  telefone: '',
  servico: SERVICES[0],
  edificio: '',
  andares: '',
  local: '',
  mensagem: '',
}

function buildMessage(f: Fields) {
  const lines: (string | null)[] = [
    'Olá Booming, gostaria de pedir uma cotação.',
    '',
    `Nome: ${f.nome}`,
    f.empresa ? `Empresa: ${f.empresa}` : null,
    `Telefone: ${f.telefone}`,
    `Serviço: ${f.servico}`,
    f.edificio ? `Tipo de edifício: ${f.edificio}` : null,
    f.andares ? `Número de andares: ${f.andares}` : null,
    f.local ? `Localização: ${f.local}` : null,
    f.mensagem ? `\n${f.mensagem}` : null,
  ]
  return lines.filter((l): l is string => l !== null).join('\n')
}

export default function Quote() {
  const [f, setF] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [sent, setSent] = useState(false)

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF((prev) => ({ ...prev, [k]: e.target.value }))
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (!f.nome.trim()) next.nome = 'Indique o seu nome.'
    if (f.telefone.replace(/\D/g, '').length < 9) next.telefone = 'Indique um número com pelo menos 9 dígitos.'
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      document.getElementById(`q-${first}`)?.focus()
      return
    }
    const text = encodeURIComponent(buildMessage(f))
    const url = CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}?text=${text}` : `https://wa.me/?text=${text}`
    window.open(url, '_blank', 'noopener')
    setSent(true)
  }

  const field = (k: keyof Fields, label: string, opts: { type?: string; optional?: boolean; auto?: string } = {}) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={`q-${k}`} className="text-[15px] font-medium">
        {label}
        {opts.optional && <span className="font-normal text-mist/65"> (opcional)</span>}
      </label>
      <input
        id={`q-${k}`}
        name={k}
        type={opts.type ?? 'text'}
        autoComplete={opts.auto}
        className="field"
        value={f[k]}
        onChange={set(k)}
        aria-invalid={errors[k] ? 'true' : undefined}
        aria-describedby={errors[k] ? `q-${k}-err` : undefined}
      />
      {errors[k] && (
        <p id={`q-${k}-err`} className="text-[14px] text-[#f0a189]">
          {errors[k]}
        </p>
      )}
    </div>
  )

  return (
    <section id="cotacao" className="relative min-h-[100dvh] bg-gradient-to-b from-transparent from-55% to-navy-deep py-[16vh]">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <h2 className="font-display text-[clamp(2.4rem,5.2vw,4.75rem)] font-black leading-[1] tracking-[-0.03em]">
            Peça uma cotação.
          </h2>
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-mist/85">
            {CONTACT.whatsapp
              ? 'Conte-nos sobre o edifício. A mensagem segue para o WhatsApp da Booming, pronta a enviar, e respondemos com uma proposta.'
              : 'Conte-nos sobre o edifício. A mensagem abre no WhatsApp, pronta a enviar, e respondemos com uma proposta.'}
          </p>
          {!CONTACT.whatsapp && (
            <p className="mt-4 text-[15px] text-mist/70">Número de WhatsApp da Booming por confirmar.</p>
          )}
          <p className="mt-10 text-mist/70">{CONTACT.city}</p>
          {CONTACT.email && (
            <a href={`mailto:${CONTACT.email}`} className="link mt-2 inline-block">
              {CONTACT.email}
            </a>
          )}
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          className="grid gap-6 rounded-[4px] bg-navy p-6 md:col-span-7 md:grid-cols-2 md:p-10"
        >
          {field('nome', 'Nome', { auto: 'name' })}
          {field('empresa', 'Empresa', { optional: true, auto: 'organization' })}
          {field('telefone', 'Telefone', { type: 'tel', auto: 'tel' })}
          <div className="flex flex-col gap-2">
            <label htmlFor="q-servico" className="text-[15px] font-medium">
              Serviço
            </label>
            <select id="q-servico" name="servico" className="field" value={f.servico} onChange={set('servico')}>
              {SERVICES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="q-edificio" className="text-[15px] font-medium">
              Tipo de edifício <span className="font-normal text-mist/65">(opcional)</span>
            </label>
            <select id="q-edificio" name="edificio" className="field" value={f.edificio} onChange={set('edificio')}>
              <option value="">Escolher</option>
              {BUILDING_TYPES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          {field('andares', 'Número de andares', { type: 'number', optional: true })}
          <div className="md:col-span-2">{field('local', 'Localização do edifício', { optional: true })}</div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="q-mensagem" className="text-[15px] font-medium">
              Mensagem <span className="font-normal text-mist/65">(opcional)</span>
            </label>
            <textarea
              id="q-mensagem"
              name="mensagem"
              className="field"
              value={f.mensagem}
              onChange={set('mensagem')}
            />
          </div>
          <div className="flex flex-wrap items-center gap-5 md:col-span-2">
            <button type="submit" className="btn btn-primary">
              <WhatsappLogo size={20} weight="fill" aria-hidden />
              Enviar pelo WhatsApp
            </button>
            <p role="status" className="text-[15px] text-mist/80">
              {sent ? 'Abrimos o WhatsApp com a sua mensagem. Só falta enviar.' : ''}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
