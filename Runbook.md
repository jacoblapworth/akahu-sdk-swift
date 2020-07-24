# XUI Runbook

This runbook provides a Kotahi operational reference. In completion, it should cover appropriate monitoring indicators of health concerns, common failure scenarios and steps to recover.

## Support Contacts

Team: UXE

XUI Development Slack Channel: [#xui-development](https://xero.slack.com/archives/C565NP1A5)

XUI Design Slack Channel: [#xui-design](https://xero.slack.com/archives/C56RA62Q5)

## Product

Xero's design system.

### Infrastructure Details

- XUI's codepipeline https://ap-southeast-2.console.aws.amazon.com/codesuite/codepipeline/pipelines/xui-code-pipeline/view?region=ap-southeast-2

## Monitoring and alerts

Google analytics

- https://analytics.google.com/analytics/web/#/report-home/a104185104w155651784p157274340

## Failure Scenario: Number 1

### Symptoms

After a release xui.xero.com cannot be accessed.

### Possible cause

The docs build step has failed.

### Steps to recover

1. Notify users at #xui-development.
2. Check the codepipeline and identify the build step that has failed.
3. Check the logs in detail to find the exact error.
4. Make required fix and make a new XUI release.

#### References

XUI's Incident Response plan

- https://docs.google.com/document/d/1vw5W0efVC24UKrFSDN_1_faUKC3RMYGHwflFiipWdD8/edit#heading=h.hfc66fr852e
