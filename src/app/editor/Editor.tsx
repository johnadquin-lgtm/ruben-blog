"use client"
import React, { useRef } from 'react'
import { useStory } from './useStory'
import styles from './Editor.module.css'

export default function Editor() {
  const { story, setStory, save, loading } = useStory()
  const canvasRef = useRef<HTMLDivElement>(null)

  if (loading || !story) return <div>Cargando…</div>

  const addPage = () => {
    setStory({
      ...story,
      pages: [...story.pages, { background: { type: 'color', value: '#1a1a2e' }, elements: [] }],
    })
  }

  const deletePage = (idx: number) => {
    if (story.pages.length === 1) return
    const newPages = story.pages.filter((_p: any, i: number) => i !== idx)
    setStory({ ...story, pages: newPages, currentPage: Math.max(0, idx - 1) })
  }

  const selectPage = (idx: number) => setStory({ ...story, currentPage: idx })

  const currentPage = story.pages[story.currentPage || 0]

  const setBg = (type: string, value: string) => {
    const newPages = [...story.pages]
    newPages[story.currentPage || 0] = { ...newPages[story.currentPage || 0], background: { type, value } }
    setStory({ ...story, pages: newPages })
  }

  const addElement = (type: string) => {
    const id = `el-${Date.now()}`
    const base = {
      id,
      type,
      content: type === 'button' ? 'Leer más' : type === 'heading' ? 'Título' : 'Texto',
      style: {
        left: '50%',
        top: '50%',
        width: '80%',
        transform: 'translate(-50%,-50%)',
        position: 'absolute',
        cursor: 'move',
      },
    } as any
    const newPages = [...story.pages]
    newPages[story.currentPage || 0].elements.push(base)
    setStory({ ...story, pages: newPages })
  }

  const startDrag = (e: React.MouseEvent, elId: string) => {
    const startX = e.clientX
    const startY = e.clientY
    const page = story.pages[story.currentPage]
    const el = page.elements.find((x: any) => x.id === elId)
    const initLeft = parseFloat(el.style.left)
    const initTop = parseFloat(el.style.top)

    const onMove = (ev: MouseEvent) => {
      const dx = ((ev.clientX - startX) * 100) / (canvasRef.current?.clientWidth || 1)
      const dy = ((ev.clientY - startY) * 100) / (canvasRef.current?.clientHeight || 1)
      el.style.left = `${Math.min(100, Math.max(0, initLeft + dx))}%`
      el.style.top = `${Math.min(100, Math.max(0, initTop + dy))}%`
      setStory({ ...story })
    }
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <div className={styles.editorContainer}>
      <header className={styles.editorHeader}>
        <h1>{story.title}</h1>
        <button onClick={save}>💾 Guardar</button>
      </header>
      <aside className={styles.editorSidebar}>
        <h2>Fondo</h2>
        <button onClick={() => setBg('color', '#1a1a2e')}>Color</button>
        <input type="color" defaultValue="#1a1a2e" onChange={e => setBg('color', e.target.value)} />
        <button onClick={() => setBg('gradient', 'linear-gradient(to bottom, #667eea, #764ba2)')}>Degradado</button>
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files?.[0]
            if (!file) return
            const reader = new FileReader()
            reader.onload = ev => setBg('image', ev.target?.result as string)
            reader.readAsDataURL(file)
          }}
        />
        <h2>Elementos</h2>
        <button onClick={() => addElement('heading')}>Título</button>
        <button onClick={() => addElement('text')}>Texto</button>
        <button onClick={() => addElement('button')}>Botón</button>
        <button onClick={() => addElement('shape')}>Forma</button>
      </aside>
      <main className={styles.editorCanvas} ref={canvasRef}>
        <div
          className={styles.pageBackground}
          style={
            currentPage.background.type === 'color'
              ? { background: currentPage.background.value }
              : currentPage.background.type === 'gradient'
              ? { background: currentPage.background.value }
              : {
                  backgroundImage: `url(${currentPage.background.value})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
          }
        />
        {currentPage.elements.map((el: any) => (
          <div key={el.id} className={styles.storyElement} style={el.style} onMouseDown={e => startDrag(e, el.id)}>
            {el.type === 'heading' && <h2>{el.content}</h2>}
            {el.type === 'text' && <p>{el.content}</p>}
            {el.type === 'button' && (
              <button onClick={() => window.open(el.link || '#', '_blank')}>{el.content}</button>
            )}
            {el.type === 'shape' && <div style={{ width: '100px', height: '100px', background: '#fff' }} />}
          </div>
        ))}
      </main>
      <aside className={styles.editorPages}>
        <h2>Páginas</h2>
        {story.pages.map((_p: any, i: number) => (
          <div key={i} className={`${styles.thumb} ${i === (story.currentPage || 0) ? styles.active : ''}`} onClick={() => selectPage(i)}>
            {story.pages[i].background.type === 'image' ? (
              <img src={story.pages[i].background.value} alt="thumb" />
            ) : (
              <div style={{ background: story.pages[i].background.type === 'color' ? story.pages[i].background.value : story.pages[i].background.value, height: '100%' }} />
            )}
          </div>
        ))}
        <button onClick={addPage}>+ Añadir página</button>
        <button onClick={() => deletePage(story.currentPage || 0)}>🗑️ Eliminar página</button>
      </aside>
    </div>
  )
}
