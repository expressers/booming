import { useState, type FormEvent } from 'react'
import { EnvelopeSimple, MapPin, WhatsappLogo } from '@phosphor-icons/react'
import { CONTACT, SERVICE_OPTIONS } from '../config'
import { contact } from '../content'

type Fields = {
  nome: string
  empresa: string
  email: string
  telefone: string
  servico: string
  local: string
  instalacao: string
  descricao: string
}

const empty: Fields = {
  nome: '',
  empresa: '',
  email: '',
  telefone: '',
  servico: SERVICE_OPTIONS[0],
  local: '',
  instalacao: '',
  descricao: '',
}

function buildMessage(f: Fields) {
  const lines: (string | null)[] = [
    'Olá BOOMING, gostaria de solicitar um orçamento.',
    '',
    `Nome: ${f.nome}`,
    f.empresa ? `Empresa: ${f.empresa}` : null,
    `Email: ${f.email}`,
    `Telefone: ${f.telefone}`,
    `Serviço pretendido: ${f.servico}`,
    f.local ? `Localização do projecto: ${f.local}` : null,
    f.instalacao ? `Tipo de edifício ou instalação: ${f.instalacao}` : null,
    f.descricao ? `\nDescrição do serviço:\n${f.descricao}` : null,
  ]
  return lines.filter((l): l is string => l !== null).join('\n')
}

export default function Contact() {
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
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) next.email = 'Indique um email válido.'
    if (f.telefone.replace(/\D/g, '').length < 9) next.telefone = 'Indique um número com pelo menos 9 dígitos.'
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) {
      document.getElementById(`c-${first}`)?.focus()
      return
    }
    if (!CONTACT.whatsapp) return
    const text = encodeURIComponent(buildMessage(f))
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${text}`, '_blank', 'noopener')
    setSent(true)
  }

  const label = (k: keyof Fields, text: string, optional = false) => (
    <label htmlFor={`c-${k}`} className="text-[15px] font-medium">
      {text}
      {optional && <span className="font-normal text-navy/60"> (opcional)</span>}
    </label>
  )
  const error = (k: keyof Fields) =>
    errors[k] && (
      <p id={`c-${k}-err`} className="text-[14px] text-[#b03a26]">
        {errors[k]}
      </p>
    )
  const input = (k: keyof Fields, text: string, opts: { type?: string; auto?: string; optional?: boolean; wide?: boolean } = {}) => (
    <div className={`flex flex-col gap-2 ${opts.wide ? 'sm:col-span-2' : ''}`}>
      {label(k, text, opts.optional)}
      <input
        id={`c-${k}`}
        name={k}
        type={opts.type ?? 'text'}
        autoComplete={opts.auto}
        className="field"
        value={f[k]}
        onChange={set(k)}
        aria-invalid={errors[k] ? 'true' : undefined}
        aria-describedby={errors[k] ? `c-${k}-err` : undefined}
      />
      {error(k)}
    </div>
  )

  return (
    <section id="contactos" className="on-dark bg-navy py-24 text-white md:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 data-reveal className="font-display text-[clamp(2.2rem,4.6vw,4rem)] font-black leading-[1] tracking-[-0.03em]">
            {contact.title}
          </h2>
          <p className="mt-8 text-xl leading-relaxed">
            {contact.lead}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            {contact.text}
          </p>
          <dl className="mt-10 space-y-4 text-white/85">
            <div className="flex items-center gap-3">
              <MapPin size={20} aria-hidden className="text-lime" />
              <dt className="sr-only">Localização</dt>
              <dd>{CONTACT.location}</dd>
            </div>
            <div className="flex items-center gap-3">
              <EnvelopeSimple size={20} aria-hidden className="text-lime" />
              <dt className="sr-only">Email</dt>
              <dd>
                {CONTACT.email ? (
                  <a className="link" href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </a>
                ) : (
                  <span className="text-white/55">Email: a confirmar</span>
                )}
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <WhatsappLogo size={20} aria-hidden className="text-lime" />
              <dt className="sr-only">Telefone e WhatsApp</dt>
              <dd>
                {CONTACT.whatsapp ? (
                  <a className="link" href={`https://wa.me/${CONTACT.whatsapp}`}>
                    +{CONTACT.whatsapp}
                  </a>
                ) : (
                  <span className="text-white/55">Telefone/WhatsApp: a confirmar</span>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          className="grid gap-6 rounded-[4px] bg-white p-6 text-navy sm:grid-cols-2 sm:p-10 lg:col-span-7"
        >
          {input('nome', 'Nome completo', { auto: 'name' })}
          {input('empresa', 'Empresa', { auto: 'organization', optional: true })}
          {input('email', 'Email profissional', { type: 'email', auto: 'email' })}
          {input('telefone', 'Telefone', { type: 'tel', auto: 'tel' })}
          <div className="flex flex-col gap-2">
            {label('servico', 'Serviço pretendido')}
            <select id="c-servico" name="servico" className="field" value={f.servico} onChange={set('servico')}>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          {input('local', 'Localização do projecto', { optional: true })}
          {input('instalacao', 'Tipo de edifício ou instalação', { optional: true, wide: true })}
          <div className="flex flex-col gap-2 sm:col-span-2">
            {label('descricao', 'Descrição do serviço', true)}
            <textarea id="c-descricao" name="descricao" className="field" value={f.descricao} onChange={set('descricao')} />
            <p className="text-[14px] text-navy/65">
              Fotografias ou documentos podem ser enviados na conversa de WhatsApp que se abre a seguir.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
            <button type="submit" className="btn btn-navy" disabled={!CONTACT.whatsapp} aria-disabled={!CONTACT.whatsapp}>
              <WhatsappLogo size={20} weight="fill" aria-hidden />
              Solicitar orçamento
            </button>
            <p role="status" className="text-[15px] text-navy/75">
              {sent
                ? 'Abrimos o WhatsApp com o seu pedido. Só falta enviar.'
                : CONTACT.whatsapp
                  ? ''
                  : 'Os pedidos de orçamento online estarão disponíveis em breve.'}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
