<div>
  <img align="left" src="./.github/images/stu.png" alt="Stu - The Glu mascot" width="200" />
  <br>
  <h3>Glu</h3>
  <p>
    <em>
      Progressive delivery that sticks
    </em>
  </p>
  <p>
    Glu is the missing piece in your CI/CD toolbelt.
    It is a framework for orchestrating, manipulating and introspecting the state of configuration Git repositories.
  </p>
  <br>
</div>

## What Is It?

Glu is a framework built to enable you to implement your own custom pipelines in code.

Glu has an opinionated set of models and abstractions, which when combined, allow you to build consistent command-line and server processes for orchestrating the progression of applications and configuration across target environments.

## Whats Included

- A CLI for interacting with the state of your pipelines.
- An API for interacting with the state of your pipelines.
- An optional UI for visualizing and interacting with the state of your pipelines.

## Use Cases

Use it to implement anything that involes automating updates to Git repositories via commits and pull-requests.

- ✅ Track new versions of applications in source repositories (OCI, Helm etc) and trigger updates to target configuration repositories (Git).
- ⌛️ Coordinate any combination of scheduled, event driven or manually triggered promotions from one environment to the next.
- 🔍 Expose a single pane of glass to compare and manipulate the state of your resources in one environment to the next.
- 🗓️ Export standardized telemetry which ties together your entire end-to-end CI/CD and promotion pipeline sequence of events.

## Development

See [DEVELOPMENT.md](./DEVELOPMENT.md) for more information.

## Roadmap Ideas

In the future we plan to support more functionality, such as:

- New sources:
  - Helm
  - Webhook / API
  - Kubernetes (direct to cluster)
- Progressive delivery (think Kargo / Argo Rollouts)
  - Ability to guard promotion with condition checks on resource status
  - Expose status via Go function definitions on resource types
- Pinning, history and rollback
  - Ability to view past states for phases
  - Be able to pin phases to current or manually overridden states
  - Rollback phases to previous known states
