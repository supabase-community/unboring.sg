# Example app with [opengovsg/design-system](https://github.com/opengovsg/design-system) and TypeScript

This example features how to use [opengovsg/design-system](https://github.com/opengovsg/design-system) as the component library within a Next.js app with TypeScript.

Next.js and opengovsg/design-system have built-in TypeScript declarations, so we'll get autocompletion for their modules straight away.

We are connecting the Next.js `_app.js` with `opengovsg/design-system`'s Provider and theme so the pages can have app-wide dark/light mode. We are also creating some components which shows the usage of `opengovsg/design-system`'s style props.

## Preview

Preview the example live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-opengovsg/design-system-typescript)

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-opengovsg/design-system-typescript&project-name=with-opengovsg/design-system-typescript&repository-name=with-opengovsg/design-system-typescript)

## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-opengovsg/design-system-typescript with-opengovsg/design-system-typescript-app
# or
yarn create next-app --example with-opengovsg/design-system-typescript with-opengovsg/design-system-typescript-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Notes

OpenGovSG Design System is built on top of Chakra. Chakra has supported Gradients and RTL in `v1.1`. To utilize RTL, [add RTL direction and swap](https://opengovsg/design-system.com/docs/features/rtl-support).

If you don't have multi-direction app, you should make `<Html lang="ar" dir="rtl">` inside `_document.ts`.
