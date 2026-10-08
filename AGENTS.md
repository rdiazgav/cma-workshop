# Workshop Conventions

## Repository Purpose

This workshop teaches how to configure the Custom Metrics Autoscaler (CMA) on a single OpenShift Local (CRC) cluster. Participants deploy a Spring Boot application and progressively add scaling triggers: CPU-based autoscaling, Prometheus-based autoscaling via thanos-querier, and cron-based scaling with a pause annotation.

## Structure

- `documentation/` contains all AsciiDoc courseware content (Antora component)
- `documentation/modules/ROOT/pages/` contains the course pages in `.adoc` format
- YAML manifests live in the root step directories
- `00-setup/` - namespace manifest
- `01-baseline/` - deployment, service, and route for the demo app with fixed replicas
- `02-cpu-trigger/` - ScaledObject with CPU trigger and load-generating Job
- `03-prometheus-trigger/` - ServiceAccount, ClusterRoleBinding, secret, TriggerAuthentication, ServiceMonitor, ScaledObject with Prometheus trigger
- `04-cron-trigger/` - ScaledObject with cron trigger
- Steps are progressive: each builds on the previous one

## AsciiDoc Formatting

- Every numbered step must have a *What* and *Why* pair in bold
- Every step must have a collapsible verification block
- Use `[.console-input]` before source blocks for commands
- Use `[.console-output]` before source blocks showing expected output
- Reference YAML manifests by file path in `oc apply -f` commands
- Do not use em dashes. Use regular dashes (`-`) instead
- Use `'''` for horizontal rules between steps
- Cross-reference other pages with `xref:page.adoc[Label]`
- External links use `link:URL[Label]`
- Use `NOTE:`, `TIP:`, `IMPORTANT:`, `WARNING:` admonitions
- All doc links must point to `docs.redhat.com` or `docs.openshift.com`
- Use attributes from `_attributes.adoc` for version numbers

## CLI Conventions

- Every `oc` command must include an explicit `--context crc` flag
- Never use `oc login` inside step pages (only in 00-setup.adoc and myenv.sh)
- YAML files with `${VARIABLE}` placeholders use `envsubst`
- All workshop variables are exported once in `00-setup.adoc`

## Content Rules

- Never include customer names, user names, or email addresses
- All content must be in English
- Prefer `registry.access.redhat.com` or `registry.redhat.io` images
- Use Red Hat / OpenShift-native components when they cover the use case

## YAML Conventions

- Every YAML file starts with a comment block: filename and purpose
- Use `app.kubernetes.io/part-of: cma-demo` label consistently
- Include resource requests and limits on Deployments
- Include readiness and liveness probes where applicable
