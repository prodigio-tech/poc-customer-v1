# Mapping capability -> evidencia

| Cap | Nombre | Workflow / script | Evidencia |
|-----|--------|-------------------|-----------|
| C1  | Control versiones | repo Git + commits | `git log`, branches, tag v1.0.0 |
| C2  | Validacion automatica | `.github/workflows/01-lint-validate.yml` | lint-report artifact |
| C3  | Despliegue DEV | `.github/workflows/02-deploy-dev.yml` + `scripts/deploy.py` | deployment-dev.txt (revision) |
| C4  | Invocacion API | `scripts/test_invoke.py dev` | test-result-dev.json (200 + corr-id) |
| C5  | Promocion DEV->QA | `.github/workflows/03-promote-qa.yml` + `scripts/promote.py` | deploy-qa.txt (mismo rev) |
| C6  | Parametrizacion | `config/dev/config.json`, `config/qa/config.json` + `scripts/apply_config.py` | diff config dev vs qa |
| C7  | Gestion proxy/policies/KVM/product | `apiproxy/` + scripts | 5 policies + KVM + product + app |
| C8  | Secretos seguros | GitHub Secrets + Apigee vault | logs sin secretos en texto plano |
| C9  | Trazabilidad | commit SHA -> run ID -> revision | apigeecli output + GH Actions run |
| C10 | Rollback | `.github/workflows/04-rollback.yml` + `scripts/rollback.py` | test-result despues de rollback |
| C11 | Evidencias | `POC_03_FORMATO_EVIDENCIAS.docx` + artifacts | formulario diligenciado + logs |

## Capacidades criticas (falla = descalificacion)
C1, C3, C5, C8, C10
