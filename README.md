# poc-customer-v1
Repo base para la PoC CI/CD Apigee CENAM (PRO-16981).

## Proposito
Referencia inicial entregada por Claro CENAM a los 9 proveedores convocados para la PoC del 30-nov-2026.
El proveedor puede **extender** esta estructura pero no **simplificarla**.

## Estructura
```
.
+- apiproxy/           API proxy bundle Apigee (poc-customer-v1)
|  +- proxies/         ProxyEndpoint (default, fault)
|  +- policies/        5 policies obligatorias + extras
|  +- targets/         TargetEndpoint (default)
|  +- resources/       JS/Python/XSL resources
|  +- poc-customer-v1.xml   Bundle descriptor
+- config/             Configuracion por ambiente (NO en el bundle)
|  +- dev/             DEV: target, kvm, certs, quotas
|  +- qa/              QA:  target, kvm, certs, quotas
+- test/               Tests de invocacion (pytest/newman)
+- scripts/            Scripts deploy/promote/rollback (apigeecli)
+- .github/workflows/  Pipelines GitHub Actions
+- docs/               Documentacion PoC
```

## Prerequisitos
- Apigee X o Hybrid con org + env DEV y QA
- Service account JSON con rol `apigee.admin` (guardar en GitHub Secret `APIGEE_SA`)
- GitHub Actions habilitado
- `apigeecli` (o plugin maven apigee) disponibles en el runner

## Configurar secrets en GitHub
```
APIGEE_ORG          = tu-organizacion
APIGEE_ENV_DEV      = dev
APIGEE_ENV_QA       = qa
APIGEE_SA           = <contenido JSON de la service account>
APIKEY_DEV          = <apikey dev>
APIKEY_QA           = <apikey qa>
```

## Comandos rapidos
```
# Validar (lint + bundle)
python scripts/validate.py

# Desplegar a DEV
python scripts/deploy.py dev

# Test de invocacion DEV
python scripts/test_invoke.py dev

# Promocion DEV -> QA (mismo SHA)
python scripts/promote.py dev qa

# Rollback a revision N-1
python scripts/rollback.py dev
```

## Workflows GitHub Actions
- `.github/workflows/01-lint-validate.yml`  - en push: lint + bundle validation
- `.github/workflows/02-deploy-dev.yml`      - en merge a main: deploy DEV + test
- `.github/workflows/03-promote-qa.yml`      - manual: promueve mismo SHA a QA + test
- `.github/workflows/04-rollback.yml`        - manual: rollback a revision N-1

## Mapeo capability -> evidencia
Ver `docs/capability-mapping.md`.

## Restricciones
- No hard-codar valores DEV/QA en el bundle; usar config/ y env vars.
- Ningun secreto en texto plano: GitHub Secrets + Apigee vault/KVM.
- El workflow debe estar en GitHub Actions.
- Rollback debe ejecutarse en vivo.
