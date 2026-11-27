# Mapping capability -> evidencia

Pipeline: `.github/workflows/main.yaml`, que llama al workflow reutilizable
`prodigio-tech/ci-templates/.github/workflows/proxy-apigee-deploy.yml` (jobs entre parentesis).

| Cap | Nombre | Archivo / workflow (job) | Evidencia |
|-----|--------|--------------------------|-----------|
| C1  | Control versiones | Repo Git: `main`, `develop`, `feature/*`; commits conventional; tag `v<revision>.0.0` (deployment trace) | `git log`, PRs, tags y releases |
| C2  | Validacion automatica | `main.yaml` en todo push (apigeelint, spectral, eslint, semgrep-sast, secret_detection, sonarqube, build) | Summary de cada job; un hallazgo bloquea el build y el deploy |
| C3  | Despliegue DEV | Push/merge a `main` (deploy) con Maven `apigee-enterprise` | Summary "Trazabilidad": revision asignada |
| C4  | Invocacion API | `test/integration/` con apickli/cucumber (integration test) | `cucumber-report` + "Invocacion de control" (HTTP, latencia, revision, x-correlation-id) |
| C5  | Promocion DEV->QA | `workflow_dispatch` con `promote_to: qa` (deploy) y aprobacion en el environment `qa` | Misma revision en QA + historial de aprobaciones |
| C6  | Parametrizacion | `config/dev/config.json`, `config/qa/config.json` (apigee config) | Summary "Configuracion del ambiente" por ambiente |
| C7  | Gestion proxy/policies/KVM/product | `apiproxy/` + `apigee-config-maven-plugin` (apigee config, apigee apps) | KVM `poc-customer-v1-config`, target server, `poc-product`, app por ambiente |
| C8  | Secretos seguros | GitHub Secrets (`GCP_CORE_INFRA_SA`, `SONAR_TOKEN`), keys enmascaradas; gitleaks | Logs sin secretos en texto plano |
| C9  | Trazabilidad | commit SHA -> run ID -> revision -> tag/release (deployment trace) | Artifact `apigee-trace` + release `vN.0.0` |
| C10 | Rollback | `workflow_dispatch` con `rollback: true` y `rollback_environment` (rollback, integration test) | Summary "Rollback" + `x-api-revision` de la revision anterior |
| C11 | Evidencias | Summaries y artifacts de cada run | Formulario diligenciado + logs |

## Capacidades criticas (falla = descalificacion)
C1, C3, C5, C8, C10
