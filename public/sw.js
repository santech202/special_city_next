if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const r=e=>n(e,a),o={module:{uri:a},exports:t,require:r};s[a]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/193-b4331ec439135ca3.js",revision:"b4331ec439135ca3"},{url:"/_next/static/chunks/221-5b9286147fdb14c2.js",revision:"5b9286147fdb14c2"},{url:"/_next/static/chunks/260-ec1b8d86c9262937.js",revision:"ec1b8d86c9262937"},{url:"/_next/static/chunks/286-bdb6fbb426926d72.js",revision:"bdb6fbb426926d72"},{url:"/_next/static/chunks/406.75f19b828c173e4e.js",revision:"75f19b828c173e4e"},{url:"/_next/static/chunks/487-bd9c08e03944c02d.js",revision:"bd9c08e03944c02d"},{url:"/_next/static/chunks/536-574a536bd0ac3412.js",revision:"574a536bd0ac3412"},{url:"/_next/static/chunks/798-43a3ea87d4c361dd.js",revision:"43a3ea87d4c361dd"},{url:"/_next/static/chunks/982-f9f9440aeff8ef36.js",revision:"f9f9440aeff8ef36"},{url:"/_next/static/chunks/framework-3b5a00d5d7e8d93b.js",revision:"3b5a00d5d7e8d93b"},{url:"/_next/static/chunks/main-3b0a9fcf3732a734.js",revision:"3b0a9fcf3732a734"},{url:"/_next/static/chunks/pages/_app-33df4a67bf133b92.js",revision:"33df4a67bf133b92"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/add-61be44883584e188.js",revision:"61be44883584e188"},{url:"/_next/static/chunks/pages/agreement-bebbf3f8824824aa.js",revision:"bebbf3f8824824aa"},{url:"/_next/static/chunks/pages/blog-7bc4503b826a2481.js",revision:"7bc4503b826a2481"},{url:"/_next/static/chunks/pages/bot-159ff04a7d9ca4ed.js",revision:"159ff04a7d9ca4ed"},{url:"/_next/static/chunks/pages/delete-e4898a181d8ea0f1.js",revision:"e4898a181d8ea0f1"},{url:"/_next/static/chunks/pages/edit/%5Bslug%5D-e872259568114f36.js",revision:"e872259568114f36"},{url:"/_next/static/chunks/pages/favourites-7acbbf1696e62cce.js",revision:"7acbbf1696e62cce"},{url:"/_next/static/chunks/pages/index-d367ac437e48ff16.js",revision:"d367ac437e48ff16"},{url:"/_next/static/chunks/pages/post/%5Bslug%5D-04452ce325e9d64e.js",revision:"04452ce325e9d64e"},{url:"/_next/static/chunks/pages/profile-3348264807c7d53d.js",revision:"3348264807c7d53d"},{url:"/_next/static/chunks/pages/rules-edd9b40b8d68eb0f.js",revision:"edd9b40b8d68eb0f"},{url:"/_next/static/chunks/pages/search-6b010b02ef096aa0.js",revision:"6b010b02ef096aa0"},{url:"/_next/static/chunks/pages/super-615f1e2cdb858249.js",revision:"615f1e2cdb858249"},{url:"/_next/static/chunks/pages/user/%5Bid%5D-77f2dd946e9ae11f.js",revision:"77f2dd946e9ae11f"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-db76649e64f3d351.js",revision:"db76649e64f3d351"},{url:"/_next/static/css/108da36e264efdf2.css",revision:"108da36e264efdf2"},{url:"/_next/static/css/2921fe912f066834.css",revision:"2921fe912f066834"},{url:"/_next/static/css/357bbaa3c5058438.css",revision:"357bbaa3c5058438"},{url:"/_next/static/css/46866868569d2d3f.css",revision:"46866868569d2d3f"},{url:"/_next/static/css/85b5a0e008ba071a.css",revision:"85b5a0e008ba071a"},{url:"/_next/static/css/b020c12e879b330b.css",revision:"b020c12e879b330b"},{url:"/_next/static/css/b96317d826c3cdac.css",revision:"b96317d826c3cdac"},{url:"/_next/static/css/d2a7527e3912e365.css",revision:"d2a7527e3912e365"},{url:"/_next/static/css/f0d651660a236656.css",revision:"f0d651660a236656"},{url:"/_next/static/css/fb78b4ef7fce734b.css",revision:"fb78b4ef7fce734b"},{url:"/_next/static/jeFk_s0mcJfWZ7HBWz22n/_buildManifest.js",revision:"072fe1cc71a1ddd9117944d962b75ddf"},{url:"/_next/static/jeFk_s0mcJfWZ7HBWz22n/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"f5062f5158e747a3b73bfcd14c291f3b"},{url:"/icons/icon-192x192.png",revision:"48a514b896955b26ffae9a216c510326"},{url:"/icons/icon-256x256.png",revision:"79b86efd04e6398f9636bb556060e649"},{url:"/icons/icon-384x384.png",revision:"7fd964d8f5a83ab1f1c03989c528396e"},{url:"/icons/icon-512x512.png",revision:"e20496d8ec573619d68bd7eabb20df1b"},{url:"/icons/icon-96x96.png",revision:"186c57b986586f27d6c9c293bf3d3806"},{url:"/images/buy.png",revision:"e03e54bb84216603d893d44f4f84ef85"},{url:"/images/clothes.png",revision:"192f6a3d45f1243ca026a40abbfe226c"},{url:"/images/estate.png",revision:"ee07bf069abb70ce67661be20c568437"},{url:"/images/free.png",revision:"0cb7f43d6a3eb0d5e9011d397f95df42"},{url:"/images/no-image.jpeg",revision:"94d0e08b2954a5ea05c2458911562320"},{url:"/images/sell.png",revision:"36c1fe35a72a96346ede100b80a6537c"},{url:"/images/services.png",revision:"d33b2982c4cc48219922234c0417ceaf"},{url:"/kuji/kuji.jpg",revision:"948ed7071ec5a762fa695b4fe5673dec"},{url:"/locales/en/common.json",revision:"eb20d0f0c46813f74407d9a283a9ef47"},{url:"/locales/en/post.json",revision:"f04ffe2e6faae867f27bc4bfca55a8bb"},{url:"/locales/en/profile.json",revision:"82176465d5a7abb6126ba2671491f267"},{url:"/locales/en/search.json",revision:"73b66d118f2ed4473b154d5dd1bdd9b3"},{url:"/locales/ru/common.json",revision:"55947dc5400887cd818c88ce2d1c34c9"},{url:"/locales/ru/post.json",revision:"2478309d29085479f28f892bf02b662a"},{url:"/locales/ru/profile.json",revision:"8f097a28c1bd9f3c44e346c58b583118"},{url:"/locales/ru/search.json",revision:"b30c8c2b8e68757894f41c77c57eddaf"},{url:"/manifest.json",revision:"f6a779036e2f78273076794f121594ed"},{url:"/promotion/preview.jpg",revision:"0fb38a350d81673f7f72b242ea7c277b"},{url:"/robots.txt",revision:"0c10f8ee5da23a5351a3d4ff1d8c9d02"},{url:"/svg/heart-red.svg",revision:"3f5ee13e6502f8f2e3265f853e262be8"},{url:"/svg/heart.svg",revision:"3b79e526c04aae62e7a21ce55b216bb0"},{url:"/yandex_b6c86722ea3968db.html",revision:"924e81677ee3a79ffb6069c30eeab105"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
