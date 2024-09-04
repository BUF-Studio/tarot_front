// next.config.mjs

import autoCert from "anchor-pki/auto-cert/integrations/next";

const withAutoCert = autoCert({
  enabledEnv: "development",
});

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@aws-amplify/adapter-nextjs', 'aws-amplify'],
  },
};

export default withAutoCert(nextConfig);