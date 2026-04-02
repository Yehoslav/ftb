import{a as l,f as i}from"../chunks/BOtavGaX.js";import{M as U,Q as $,x as n,y as s,z as e,P as b,H as t,O as j,W as B,a6 as C}from"../chunks/C1robant.js";import{s as h}from"../chunks/k_Eu9BfI.js";import{a as F,e as H,h as J,i as M}from"../chunks/CUXjzNTl.js";import{s as x}from"../chunks/Cb3x0RsH.js";var Q=i('<div class="flex flex-row gap-x-4 items-center  svelte-1i5b1z9"><a class="block max-w-120 min-w-120 h-80 overflow-hidden svelte-1i5b1z9"><img class="w-full h-full transition hover:scale-110 object-cover svelte-1i5b1z9" alt=""/></a> <div class="svelte-1i5b1z9"><h2 class="font-bold text-xl hover:text-blue-600 svelte-1i5b1z9"><a class="svelte-1i5b1z9"> </a></h2> <div class="svelte-1i5b1z9"></div></div></div> <hr class="border-olive-200 svelte-1i5b1z9"/>',1),S=i(' <div class="flex flex-col gap-y-4 svelte-1i5b1z9"></div>',1),W=i('<p style="color: red" class="svelte-1i5b1z9"> </p>'),A=i('<div class="flex flex-row svelte-1i5b1z9">Încărcăm postarea<div class="loader svelte-1i5b1z9"></div></div>'),D=i('<div class="lg:w-300 border-x-1 border-olive-200 py-8 flex flex-col mt-8 gap-4 mx-auto content-center svelte-1i5b1z9"><h1 class="text-3xl svelte-1i5b1z9">Noutăți FTB</h1> <!></div>');function V(N,k){U(k,!0);async function q(){return(await fetch("https://ftbromania.ro/incubator/graphql",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`{
                        posts {
                            nodes {
                                title
                                slug
                                excerpt
                                featuredImage {
                                    node {
                                        sourceUrl
                                    }
                               }
                            }
                        }
                    }`})}).then(a=>a.json())).data.posts.nodes}var f=D(),I=n(s(f),2);F(I,q,r=>{var a=A();l(r,a)},(r,a)=>{var o=S(),v=j(o),u=n(v);H(u,21,()=>t(a),M,(O,c)=>{const _=C(()=>`/noutati/${t(c).slug}`);var g=Q(),z=j(g),d=s(z),P=s(d);e(d);var w=n(d,2),p=s(w),m=s(p),T=s(m,!0);e(m),e(p);var y=n(p,2);J(y,()=>t(c).excerpt,!0),e(y),e(w),e(z),B(2),b(()=>{x(d,"href",t(_)),x(P,"src",t(c).featuredImage.node.sourceUrl),x(m,"href",t(_)),h(T,t(c).title)}),l(O,g)}),e(u),b(()=>h(v,`Nr. postări: ${t(a).length??""} `)),l(r,o)},(r,a)=>{var o=W(),v=s(o,!0);e(o),b(()=>h(v,t(a).message)),l(r,o)}),e(f),l(N,f),$()}export{V as component};
