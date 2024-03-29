require("dotenv").config();
export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/css/main.scss"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "~plugins/vuelidate", ssr: false },
    { src: "~plugins/inlineSVG", ssr: false }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: {
    dirs: [
      "~/components",
      "~/components/common",
      "~/components/forms",
      "~/components/forms/auth-forms",
      "~/components/forms/branch-form",
      "~/components/forms/clinic-forms",
      "~/components/forms/role-forms",
      "~/components/forms/users-forms",
      "~/components/sections",
      "~/components/sections/users-sections",
      "~/components/tables"
    ]
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/moment"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/pwa",
    "nuxt-i18n",
    "@nuxt/content",
    "@nuxtjs/apollo",
    "@nuxtjs/toast",
    ["cookie-universal-nuxt", { alias: "cookiz" }],
    ["@nuxtjs/dotenv", { path: ".env" }]
  ],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.HTTP_END_POINT
      }
    }
  },
  toast: {
    position: "top-center",
    theme: "bubble",
    keepOnHover: true,
    duration: 4000,
    className: "msgToast"
  },

  bootstrapVue: {
    icons: false,
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    componentPlugins: [
      "FormPlugin",
      "FormInputPlugin",
      "FormGroupPlugin",
      "InputGroupPlugin",
      "FormTextareaPlugin",
      "FormCheckboxPlugin",
      "CollapsePlugin",
      "DropdownPlugin",
      "PaginationPlugin",
      "SpinnerPlugin",
      "VBTooltipPlugin",
      "ModalPlugin"
    ],
    directivePlugins: []
  },

  i18n: {
    lazy: true,
    locales: [
      {
        name: "English",
        code: "en",
        iso: "en-US",
        file: "en.json"
      },
      {
        name: "Arabic",
        code: "ar",
        iso: "ar-EG",
        file: "ar.json"
      }
    ],
    langDir: "lang/",
    defaultLocale: "en"
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    vendor: ["vuelidate"]
  }
};
