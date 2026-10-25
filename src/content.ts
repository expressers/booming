// Textos enviados por Carlos César (BOOMING X EXPRESSERS, 21/10/2026).
// O original completo está em content/textos-cliente.md.

export const hero = {
  title: 'O futuro da limpeza e manutenção está no ar.',
  subtitle:
    'Soluções profissionais com drones para limpeza de fachadas, painéis solares, estruturas elevadas e inspecção de infra-estruturas.',
}

export const intro = {
  statement: 'Tecnologia aérea ao serviço da limpeza, manutenção e inspecção de infra-estruturas.',
  paragraphs: [
    'Combinamos tecnologia aérea, equipamentos especializados e métodos de trabalho orientados para a eficiência, oferecendo soluções adaptadas às necessidades de edifícios comerciais, instalações industriais e infra-estruturas de difícil acesso.',
    'Ajudamos as empresas a optimizar os seus processos de manutenção, reduzir a dependência de determinados métodos convencionais de acesso e melhorar a gestão dos seus activos.',
  ],
}

export const about = {
  title: 'Tecnologia, inovação e eficiência ao serviço das empresas.',
  paragraphs: [
    'A BOOMING Soluções Aéreas, unidade de negócio da BOOMING Prestação de Serviços Lda., nasce com o propósito de introduzir novas soluções tecnológicas nos sectores da limpeza técnica, manutenção e inspecção de infra-estruturas em Angola.',
    'Através da utilização de drones e equipamentos especializados, desenvolvemos abordagens inovadoras para responder aos desafios de limpeza e conservação de superfícies elevadas, estruturas complexas e instalações de grande dimensão.',
    'Trabalhamos com uma abordagem orientada para as necessidades de cada cliente, privilegiando o planeamento, a segurança operacional, a qualidade de execução e a utilização responsável dos recursos.',
    'O nosso objectivo é oferecer soluções que contribuam para operações mais eficientes, uma manutenção mais organizada e uma melhor gestão dos activos empresariais.',
  ],
  mission:
    'Disponibilizar soluções aéreas inovadoras para limpeza, manutenção e inspecção, contribuindo para a eficiência operacional e a conservação dos activos dos nossos clientes.',
  vision:
    'Ser uma referência em Angola na aplicação de tecnologias aéreas à limpeza técnica, manutenção e inspecção de edifícios e infra-estruturas.',
  values: [
    'Segurança operacional',
    'Inovação tecnológica',
    'Qualidade e rigor',
    'Eficiência',
    'Responsabilidade ambiental',
    'Compromisso com o cliente',
  ],
}

export type Service = {
  id: string
  name: string
  image: string
  alt: string
  paragraphs: string[]
  applications: string[]
}

export const services: Service[] = [
  {
    id: 'fachadas',
    name: 'Limpeza de fachadas e edifícios',
    image: '/img/tower.webp',
    alt: 'Fachada envidraçada de uma torre de escritórios vista de baixo',
    paragraphs: [
      'Disponibilizamos soluções de limpeza aérea para fachadas, superfícies envidraçadas e estruturas elevadas, recorrendo a drones equipados com sistemas de pulverização e limpeza adequados às características de cada projecto.',
      'Os nossos serviços destinam-se a edifícios que exigem métodos especializados de acesso e manutenção.',
    ],
    applications: [
      'Torres empresariais e edifícios de escritórios',
      'Hotéis e unidades turísticas',
      'Hospitais e clínicas',
      'Centros comerciais',
      'Edifícios residenciais e institucionais',
    ],
  },
  {
    id: 'solar',
    name: 'Limpeza de painéis solares',
    image: '/img/solar-aerial.webp',
    alt: 'Vista aérea de um parque solar',
    paragraphs: [
      'Desenvolvemos soluções de limpeza para instalações fotovoltaicas, com métodos adaptados à dimensão do parque, às condições de operação e às recomendações dos fabricantes.',
      'O serviço visa apoiar os programas de manutenção e a conservação dos painéis, contribuindo para a gestão adequada das instalações solares.',
    ],
    applications: [
      'Parques solares',
      'Instalações industriais',
      'Edifícios comerciais',
      'Sistemas fotovoltaicos de grande dimensão',
    ],
  },
  {
    id: 'inspeccao',
    name: 'Inspecção aérea de infra-estruturas',
    image: '/img/drone-clouds.webp',
    alt: 'Drone com câmara em voo',
    paragraphs: [
      'Utilizamos drones para recolher imagens aéreas e apoiar a observação visual de edifícios, estruturas e instalações de difícil acesso.',
      'A informação recolhida pode ajudar a identificar anomalias visíveis, documentar o estado aparente das estruturas e apoiar o planeamento de intervenções de manutenção.',
    ],
    applications: [
      'Fachadas e coberturas',
      'Estruturas metálicas',
      'Infra-estruturas industriais',
      'Instalações energéticas',
      'Edifícios de grande dimensão',
    ],
  },
  {
    id: 'coberturas',
    name: 'Limpeza de coberturas e estruturas industriais',
    image: '/img/roof-a.webp',
    alt: 'Vista aérea da cobertura de um armazém industrial',
    paragraphs: [
      'Disponibilizamos soluções de limpeza para coberturas, estruturas elevadas e superfícies industriais, mediante avaliação prévia dos materiais, do nível de sujidade e das condições de segurança.',
      'Cada intervenção é planeada em função das características da instalação e dos requisitos operacionais aplicáveis.',
    ],
    applications: [
      'Armazéns e naves industriais',
      'Coberturas metálicas',
      'Estruturas de grande dimensão',
      'Instalações logísticas',
      'Edifícios comerciais e industriais',
    ],
  },
  {
    id: 'manutencao',
    name: 'Contratos de manutenção programada',
    image: '/img/city-b.webp',
    alt: 'Torres de escritórios ao fim da tarde',
    paragraphs: [
      'Desenvolvemos propostas de manutenção periódica para empresas que pretendem organizar a limpeza e conservação dos seus activos de forma planeada.',
      'Os serviços podem ser estruturados de acordo com a dimensão das instalações, a frequência necessária e as prioridades operacionais do cliente.',
    ],
    applications: [
      'Grupos hoteleiros',
      'Bancos e instituições financeiras',
      'Hospitais e clínicas',
      'Empresas de gestão imobiliária',
      'Centros comerciais',
      'Instalações industriais e energéticas',
    ],
  },
]

export const sectors = {
  title: 'Soluções adaptadas a diferentes sectores.',
  intro:
    'A nossa tecnologia pode ser aplicada a diferentes contextos empresariais, desde edifícios comerciais até infra-estruturas industriais, sempre mediante avaliação da viabilidade técnica e das condições operacionais.',
  items: [
    {
      icon: 'hotel',
      name: 'Hotelaria e turismo',
      text: 'Limpeza e conservação de fachadas, superfícies envidraçadas e estruturas exteriores de hotéis e unidades turísticas.',
    },
    { icon: 'health', name: 'Saúde', text: 'Soluções de manutenção exterior para hospitais, clínicas e outras instalações de saúde.' },
    {
      icon: 'bank',
      name: 'Banca e escritórios corporativos',
      text: 'Serviços de limpeza e conservação de edifícios empresariais, sedes institucionais e torres de escritórios.',
    },
    {
      icon: 'retail',
      name: 'Comércio e imobiliário',
      text: 'Limpeza de fachadas, coberturas e superfícies exteriores de centros comerciais e edifícios residenciais ou comerciais.',
    },
    { icon: 'solar', name: 'Energia solar', text: 'Limpeza de painéis fotovoltaicos e apoio à manutenção de parques solares.' },
    {
      icon: 'industry',
      name: 'Indústria e energia',
      text: 'Inspecção visual e limpeza técnica de estruturas industriais, mediante avaliação das condições de segurança e dos requisitos específicos de cada instalação.',
    },
  ],
}

export const why = {
  title: 'Uma nova abordagem à limpeza e manutenção.',
  items: [
    {
      name: 'Tecnologia aplicada',
      text: 'Utilizamos soluções tecnológicas para responder a desafios de limpeza e inspecção em superfícies elevadas e áreas de difícil acesso.',
    },
    {
      name: 'Segurança operacional',
      text: 'Cada intervenção deve ser precedida de avaliação de riscos, planeamento técnico e definição das medidas preventivas adequadas.',
    },
    {
      name: 'Eficiência operacional',
      text: 'Seleccionamos os equipamentos e métodos em função das características do local, dos objectivos do cliente e das condições da operação.',
    },
    {
      name: 'Responsabilidade ambiental',
      text: 'Promovemos a utilização responsável da água e a selecção criteriosa de produtos e métodos de limpeza adequados às superfícies intervencionadas.',
    },
    {
      name: 'Soluções personalizadas',
      text: 'Adaptamos as propostas às necessidades de cada instalação, ao tipo de serviço e à dimensão do projecto.',
    },
    {
      name: 'Manutenção planeada',
      text: 'Disponibilizamos a possibilidade de estruturar intervenções periódicas, contribuindo para uma gestão mais organizada da conservação dos activos.',
    },
  ],
}

export const process = {
  title: 'Um processo orientado para resultados.',
  steps: [
    {
      name: 'Levantamento das necessidades',
      text: 'Recolhemos informação sobre a instalação, a superfície, a dimensão do trabalho e os objectivos do cliente.',
    },
    {
      name: 'Avaliação técnica',
      text: 'Analisamos a viabilidade da operação, os equipamentos necessários, as condições de acesso e os requisitos de segurança.',
    },
    {
      name: 'Planeamento e proposta',
      text: 'Definimos a metodologia de trabalho, os recursos necessários, o prazo previsto e as condições comerciais.',
    },
    {
      name: 'Execução do serviço',
      text: 'Realizamos a intervenção de acordo com o plano aprovado, as condições operacionais e as medidas de segurança aplicáveis.',
    },
    {
      name: 'Verificação e entrega',
      text: 'Quando previsto no âmbito do serviço, documentamos a intervenção e disponibilizamos registos fotográficos e recomendações de manutenção.',
    },
  ],
}

export const safety = {
  title: 'Inovação com responsabilidade.',
  paragraphs: [
    'A segurança e a responsabilidade operacional são elementos fundamentais na aplicação de tecnologias aéreas a serviços de limpeza, manutenção e inspecção.',
    'Na BOOMING Soluções Aéreas, cada projecto deve ser avaliado de acordo com as características da instalação, a presença de pessoas, as condições meteorológicas, os equipamentos utilizados e os requisitos regulamentares aplicáveis.',
    'A nossa abordagem privilegia o planeamento, a identificação de riscos, a preparação da área de trabalho e a utilização de métodos adequados às superfícies intervencionadas.',
    'Procuramos igualmente promover uma utilização responsável dos recursos, com especial atenção ao consumo de água e à escolha de produtos de limpeza apropriados.',
    'O compromisso é desenvolver operações tecnicamente adequadas, devidamente planeadas e orientadas para a qualidade do serviço.',
  ],
}

export const gallery = {
  title: 'Tecnologia em acção.',
  intro:
    'Conheça as soluções, os equipamentos e as aplicações da tecnologia aérea na limpeza, manutenção e inspecção de edifícios e infra-estruturas.',
  // Imagens ilustrativas de banco de imagens: ainda não há trabalhos da Booming para mostrar.
  items: [
    { name: 'Limpeza de fachadas', image: '/img/facade-c.webp', alt: 'Fachada de vidro de um edifício moderno' },
    { name: 'Limpeza de painéis solares', image: '/img/solar-field.webp', alt: 'Fileiras de painéis solares num campo' },
    { name: 'Limpeza de estruturas industriais', image: '/img/roof-c.webp', alt: 'Instalação industrial vista do ar' },
    { name: 'Inspecção aérea', image: '/img/drone-dusk.webp', alt: 'Drone em voo ao entardecer' },
    { name: 'Equipamentos e tecnologia', image: '/img/drone-white.webp', alt: 'Drone de carga em voo' },
    { name: 'Operações e preparação técnica', image: '/img/drone-ops.webp', alt: 'Drone a sobrevoar uma paisagem' },
  ],
}

export const faq = [
  {
    q: 'A limpeza com drones pode ser realizada em qualquer edifício?',
    a: 'Não. A viabilidade depende da altura, do tipo de superfície, das condições de acesso, do espaço envolvente, das condições meteorológicas e dos requisitos de segurança.',
  },
  {
    q: 'É possível limpar fachadas de vidro?',
    a: 'Sim, desde que o sistema e o método de limpeza sejam adequados às características do vidro, aos revestimentos e às recomendações do fabricante.',
  },
  {
    q: 'A BOOMING realiza limpeza de painéis solares?',
    a: 'Sim. A limpeza de painéis solares faz parte das áreas de serviço propostas, sujeita à avaliação técnica da instalação e às condições específicas da operação.',
  },
  {
    q: 'Que tipos de clientes podem contratar os serviços?',
    a: 'Empresas, hotéis, hospitais, bancos, condomínios, centros comerciais, operadores de parques solares e entidades responsáveis por instalações industriais.',
  },
  {
    q: 'É possível contratar serviços regulares?',
    a: 'Sim. Podem ser propostas soluções de manutenção programada, com frequência e âmbito definidos de acordo com as necessidades do cliente.',
  },
  {
    q: 'Como posso solicitar um orçamento?',
    a: 'O cliente deverá indicar o tipo de serviço pretendido, a localização da instalação e uma descrição das necessidades. Sempre que possível, poderá disponibilizar fotografias ou vídeos para apoiar a avaliação inicial.',
  },
  {
    q: 'Os serviços dependem de avaliação prévia?',
    a: 'Sim. A viabilidade técnica, os requisitos de segurança e as condições de execução devem ser avaliados antes da confirmação de cada intervenção.',
  },
]

export const contact = {
  title: 'Vamos avaliar o seu projecto?',
  lead: 'Precisa de uma solução para limpeza de fachadas, manutenção de painéis solares ou inspecção de infra-estruturas?',
  text: 'Entre em contacto com a BOOMING Soluções Aéreas. A nossa equipa poderá analisar as necessidades da sua instalação e preparar uma proposta técnica e comercial adequada ao projecto.',
}

export const footer = {
  name: 'BOOMING Soluções Aéreas',
  tagline: 'Tecnologia aérea aplicada à limpeza, manutenção e inspecção de infra-estruturas.',
}

export const navLinks = [
  { href: '#topo', label: 'Início' },
  { href: '#quem-somos', label: 'Quem somos' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#sectores', label: 'Sectores de actuação' },
  { href: '#projectos', label: 'Projectos' },
  { href: '#seguranca', label: 'Segurança e Ambiente' },
  { href: '#faq', label: 'Perguntas frequentes' },
  { href: '#contactos', label: 'Contactos' },
]
