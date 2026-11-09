import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Concurso = {
  id: string
  nome: string
}

function App() {
  const [nome, setNome] = useState('')
  const [concursos, setConcursos] = useState<Concurso[]>([])

  function adicionarConcurso(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    const nomeLimpo = nome.trim()
    if (!nomeLimpo) return

    const novoConcurso = {
      id: crypto.randomUUID(),
      nome: nomeLimpo,
    }

    setConcursos((listaAtual) => [...listaAtual, novoConcurso])
    setNome('')
  }

  return (
    <main>
      <h1>Concurso em Foco</h1>
      <p>Organize seus concursos e acompanhe seu progresso.</p>

      <section>
        <h2>Meus concursos</h2>

        <form onSubmit={adicionarConcurso}>
          <label htmlFor="nome">Nome do concurso</label>
          <input
            id="nome"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
            placeholder="Ex.: PRF Administrativo"
            maxLength={120}
            required
          />
          <button type="submit">Adicionar</button>
        </form>

        {concursos.length === 0 ? (
          <p>Você ainda não cadastrou nenhum concurso.</p>
        ) : (
          <ul>
            {concursos.map((concurso) => (
              <li key={concurso.id}>{concurso.nome}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App