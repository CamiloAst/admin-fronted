# Frontend - Gestión de Proyectos (React + Vite)

Frontend minimalista, estético y fluido para el backend Flask que expone `/api/v1/*`.

## Endpoints soportados
- Auth: `/auth/login`, `/auth/me`
- Proyectos: `/projects` (GET/POST), `/projects/:id` (PUT/DELETE)
- Tareas: `/tasks` (GET/POST), `/tasks/:id` (PUT), `/tasks/:id/move` (POST body `{ state_kanban }`)
- Sprints: `/sprints` (GET/POST)
- Reportes: `/reports/summary` (GET)
- KPI: `/kpi/burndown` (GET)
- Tiempo: `/time` (GET/POST)

> Ajusta si tu backend difiere.

## Variables de entorno
Crea un archivo `.env` con:
```
VITE_API_BASE=http://localhost:5000/api/v1
```

## Ejecutar
```bash
npm install
npm run dev
```
Abre http://localhost:5173

## Notas
- Autenticación via JWT Bearer en `localStorage`.
- Estilos sin dependencias (CSS en línea) para evitar configurar Tailwind. Puedes migrar a Tailwind/shadcn cuando quieras.
- Panel Dashboard con gráficas vía `recharts`.
