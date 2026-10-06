# Decisiones vigentes

Estas decisiones evitan que cada evolución reabra debates ya resueltos. Si una
decisión deja de ser válida, se modifica aquí con la fecha, el motivo y sus
consecuencias; no se reescribe silenciosamente.

| ID | Decisión | Motivo y consecuencia |
|---|---|---|
| D-001 | La app es una PWA estática sin backend. | El uso es familiar y reducido; evita coste, cuentas y complejidad de mantenimiento. |
| D-002 | El progreso se guarda en `localStorage` por perfil. | Funciona sin conexión ni registro. El progreso no se sincroniza entre dispositivos ni entre producción y staging. |
| D-003 | No se incorpora control parental por ahora. | No forma parte del alcance actual; cualquier futura necesidad se analizará como producto independiente. |
| D-004 | Vercel es el hosting oficial. | GitHub conserva código e historial; Vercel proporciona producción y preview de ramas. |
| D-005 | `staging` precede siempre a `main`. | Todo cambio funcional se valida en staging antes de llegar a la URL pública de producción. |
| D-006 | Peque Aprende prioriza comprensión no lectora. | Toda interacción esencial debe apoyarse en imagen grande y voz; el texto es complemento para acompañante o lector emergente. |
| D-007 | Los nombres técnicos históricos de PequeWorld se conservan cuando no aportan valor migrarlos. | Evita una migración amplia y arriesgada; el nombre visible para el usuario es Peque Aprende. |
| D-008 | Las recompensas reflejan aprendizaje real. | La ruta diaria, rachas y XP no deben progresar por abrir la app o pulsar sin practicar. |

## Decisiones operativas pendientes

- Activar y verificar la protección de `main` en GitHub: PR obligatoria,
  bloqueo de force-push y de eliminación.
- Cuando exista una comprobación automatizada adecuada, exigir que la única
  ruta ordinaria hacia `main` sea una PR desde `staging`.

El procedimiento técnico para aplicar estas decisiones está en
`OPERACION_Y_DESPLIEGUE.md`.
