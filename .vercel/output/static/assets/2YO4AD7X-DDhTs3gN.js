import{o as X,b as L,d as y,e as Ct,f as xt,h as T,i as Mt,k as D,l as u,m as nt,u as Me,t as m,n as h,p as R,q as p,s as G,v as Y,w as St,x as ue,y as pe,z as $t,A as Et,B as At,C as Pt,D as Se,P as Tt,E as ie,S as B,T as $e,F as be,G as _,H as ze,I as Ie,J as Bt,K as zt,L as It,M as Fe,N as Ft,O as at,Q as Lt,U as Ee,V as Le}from"./main-8j_PKNGi.js";import{c as O}from"./clsx-B-dksMZM.js";function Dt(t){return t!==null&&(typeof t=="object"||typeof t=="function")}const me=(t,e)=>t===e||t.length===e.length&&t.every((a,i)=>a===e[i]),De=t=>typeof t=="function"&&!t.length?t():t,He=t=>Array.isArray(t)?t:t?[t]:[];function Ne(t,...e){return typeof t=="function"?t(...e):t}const Ht=X;function oe(t,e,a,i){return t.addEventListener(e,a,i),Ht(t.removeEventListener.bind(t,e,a,i))}function Ue(t,e,a,i){const d=()=>{He(De(t)).forEach(l=>{l&&He(De(e)).forEach(o=>oe(l,o,a,i))})};typeof t=="function"?L(d):y(d)}function Ae(t,e=Ct()){let a=0,i,d;return()=>(a++,X(()=>{a--,queueMicrotask(()=>{!a&&d&&(d(),d=i=void 0)})}),d||xt(l=>i=t(d=l),e),i)}function Oe(t,e){for(let a=t.length-1;a>=0;a--){const i=e.slice(0,a+1);if(!me(t[a],i))return!1}return!0}const ot=Ae(()=>{const[t,e]=T(null);return oe(window,"keydown",a=>{e(a),setTimeout(()=>e(null))}),t}),it=Ae(()=>{const[t,e]=T([]),a=()=>e([]),i=ot();return oe(window,"keydown",d=>{if(d.repeat||typeof d.key!="string")return;const l=d.key.toUpperCase(),o=t();if(o.includes(l))return;const n=[...o,l];o.length===0&&l!=="ALT"&&l!=="CONTROL"&&l!=="META"&&l!=="SHIFT"&&(d.shiftKey&&n.unshift("SHIFT"),d.altKey&&n.unshift("ALT"),d.ctrlKey&&n.unshift("CONTROL"),d.metaKey&&n.unshift("META")),e(n)}),oe(window,"keyup",d=>{if(typeof d.key!="string")return;const l=d.key.toUpperCase();e(o=>o.filter(n=>n!==l))}),oe(window,"blur",a),oe(window,"contextmenu",d=>{d.defaultPrevented||a()}),t[0]=t,t[1]={event:i},t[Symbol.iterator]=function*(){yield t[0],yield t[1]},t}),Nt=Ae(()=>{const t=it();return D(e=>t().length===0?[]:[...e,t()],[])});function Ut(t,e,a={}){if(!t.length)return;t=t.map(s=>s.toUpperCase());const{preventDefault:i=!0}=a,d=ot(),l=Nt();let o=!1;const n=s=>{if(!s.length)return o=!1;if(o)return;const c=d();s.length<t.length?Oe(s,t.slice(0,s.length))?i&&c&&c.preventDefault():o=!0:(o=!0,Oe(s,t)&&(i&&c&&c.preventDefault(),e(c)))},r=s=>{const c=s.at(-1);if(!c)return;const g=d();if(i&&c.length<t.length){me(c,t.slice(0,t.length-1))&&g&&g.preventDefault();return}if(me(c,t)){const f=s.at(-2);(!f||me(f,t.slice(0,t.length-1)))&&(i&&g&&g.preventDefault(),e(g))}};L(Mt(l,a.requireReset?n:r))}let Ot={data:""},Qt=t=>{if(typeof window=="object"){let e=(t?t.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return e.nonce=window.__nonce__,e.parentNode||(t||document.head).appendChild(e),e.firstChild}return t||Ot},qt=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Rt=/\/\*[^]*?\*\/|  +/g,Qe=/\n+/g,ne=(t,e)=>{let a="",i="",d="";for(let l in t){let o=t[l];l[0]=="@"?l[1]=="i"?a=l+" "+o+";":i+=l[1]=="f"?ne(o,l):l+"{"+ne(o,l[1]=="k"?"":e)+"}":typeof o=="object"?i+=ne(o,e?e.replace(/([^,])+/g,n=>l.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,r=>/&/.test(r)?r.replace(/&/g,n):n?n+" "+r:r)):l):o!=null&&(l=/^--/.test(l)?l:l.replace(/[A-Z]/g,"-$&").toLowerCase(),d+=ne.p?ne.p(l,o):l+":"+o+";")}return a+(e&&d?e+"{"+d+"}":d)+i},J={},lt=t=>{if(typeof t=="object"){let e="";for(let a in t)e+=a+lt(t[a]);return e}return t},jt=(t,e,a,i,d)=>{let l=lt(t),o=J[l]||(J[l]=(r=>{let s=0,c=11;for(;s<r.length;)c=101*c+r.charCodeAt(s++)>>>0;return"go"+c})(l));if(!J[o]){let r=l!==t?t:(s=>{let c,g,f=[{}];for(;c=qt.exec(s.replace(Rt,""));)c[4]?f.shift():c[3]?(g=c[3].replace(Qe," ").trim(),f.unshift(f[0][g]=f[0][g]||{})):f[0][c[1]]=c[2].replace(Qe," ").trim();return f[0]})(t);J[o]=ne(d?{["@keyframes "+o]:r}:r,a?"":"."+o)}let n=a&&J.g?J.g:null;return a&&(J.g=J[o]),((r,s,c,g)=>{g?s.data=s.data.replace(g,r):s.data.indexOf(r)===-1&&(s.data=c?r+s.data:s.data+r)})(J[o],e,i,n),o},Vt=(t,e,a)=>t.reduce((i,d,l)=>{let o=e[l];if(o&&o.call){let n=o(a),r=n&&n.props&&n.props.className||/^go/.test(n)&&n;o=r?"."+r:n&&typeof n=="object"?n.props?"":ne(n,""):n===!1?"":n}return i+d+(o??"")},"");function ye(t){let e=this||{},a=t.call?t(e.p):t;return jt(a.unshift?a.raw?Vt(a,[].slice.call(arguments,1),e.p):a.reduce((i,d)=>Object.assign(i,d&&d.call?d(e.p):d),{}):a,Qt(e.target),e.g,e.o,e.k)}ye.bind({g:1});ye.bind({k:1});const st=nt(void 0),Yt=t=>{const[e,a]=T(t.theme);return L(()=>{a(t.theme)}),u(st.Provider,{value:{theme:e,setTheme:a},get children(){return t.children}})};function Gt(){const t=Me(st);if(!t)throw new Error("useTheme must be used within a ThemeContextProvider");return t}const S={colors:{inherit:"inherit",current:"currentColor",transparent:"transparent",black:"#000000",white:"#ffffff",neutral:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},darkGray:{50:"#525c7a",100:"#49536e",200:"#414962",300:"#394056",400:"#313749",500:"#292e3d",600:"#212530",700:"#191c24",800:"#111318",900:"#0b0d10"},gray:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},blue:{25:"#F5FAFF",50:"#EFF8FF",100:"#D1E9FF",200:"#B2DDFF",300:"#84CAFF",400:"#53B1FD",500:"#2E90FA",600:"#1570EF",700:"#175CD3",800:"#1849A9",900:"#194185"},green:{25:"#F6FEF9",50:"#ECFDF3",100:"#D1FADF",200:"#A6F4C5",300:"#6CE9A6",400:"#32D583",500:"#12B76A",600:"#039855",700:"#027A48",800:"#05603A",900:"#054F31"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},yellow:{25:"#FFFCF5",50:"#FFFAEB",100:"#FEF0C7",200:"#FEDF89",300:"#FEC84B",400:"#FDB022",500:"#F79009",600:"#DC6803",700:"#B54708",800:"#93370D",900:"#7A2E0E"},purple:{25:"#FAFAFF",50:"#F4F3FF",100:"#EBE9FE",200:"#D9D6FE",300:"#BDB4FE",400:"#9B8AFB",500:"#7A5AF8",600:"#6938EF",700:"#5925DC",800:"#4A1FB8",900:"#3E1C96"},teal:{25:"#F6FEFC",50:"#F0FDF9",100:"#CCFBEF",200:"#99F6E0",300:"#5FE9D0",400:"#2ED3B7",500:"#15B79E",600:"#0E9384",700:"#107569",800:"#125D56",900:"#134E48"},pink:{25:"#fdf2f8",50:"#fce7f3",100:"#fbcfe8",200:"#f9a8d4",300:"#f472b6",400:"#ec4899",500:"#db2777",600:"#be185d",700:"#9d174d",800:"#831843",900:"#500724"},cyan:{25:"#ecfeff",50:"#cffafe",100:"#a5f3fc",200:"#67e8f9",300:"#22d3ee",400:"#06b6d4",500:"#0891b2",600:"#0e7490",700:"#155e75",800:"#164e63",900:"#083344"}},font:{size:{xs:"calc(var(--tsrd-font-size) * 0.75)",sm:"calc(var(--tsrd-font-size) * 0.875)",md:"var(--tsrd-font-size)"},lineHeight:{xs:"calc(var(--tsrd-font-size) * 1)"},weight:{medium:"500",semibold:"600",bold:"700"},fontFamily:{sans:"ui-sans-serif, Inter, system-ui, sans-serif, sans-serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"}},border:{radius:{xs:"calc(var(--tsrd-font-size) * 0.125)",sm:"calc(var(--tsrd-font-size) * 0.25)",full:"9999px"}},size:{.5:"calc(var(--tsrd-font-size) * 0.125)",1:"calc(var(--tsrd-font-size) * 0.25)",1.5:"calc(var(--tsrd-font-size) * 0.375)",2:"calc(var(--tsrd-font-size) * 0.5)",2.5:"calc(var(--tsrd-font-size) * 0.625)",3:"calc(var(--tsrd-font-size) * 0.75)",4.5:"calc(var(--tsrd-font-size) * 1.125)",6.5:"calc(var(--tsrd-font-size) * 1.625)",12:"calc(var(--tsrd-font-size) * 3)"}},Wt={primary:{bg:S.colors.gray[900],hover:S.colors.gray[800],active:S.colors.gray[700],text:"#fff",border:S.colors.gray[900]},secondary:{bg:S.colors.gray[100],hover:S.colors.gray[200],active:S.colors.gray[300],text:S.colors.gray[900],border:S.colors.gray[300]},info:{bg:S.colors.blue[500],hover:S.colors.blue[600],active:S.colors.blue[700],text:"#fff",border:S.colors.blue[500]},warning:{bg:S.colors.yellow[500],hover:S.colors.yellow[600],active:S.colors.yellow[700],text:"#fff",border:S.colors.yellow[500]},danger:{bg:S.colors.red[500],hover:S.colors.red[600],active:S.colors.red[700],text:"#fff",border:S.colors.red[500]},success:{bg:S.colors.green[500],hover:S.colors.green[600],active:S.colors.green[700],text:"#fff",border:S.colors.green[500]}},x=ye,qe=(t="dark")=>{const{colors:e,font:a,size:i,border:d}=S,{fontFamily:l}=a,o=(r,s)=>t==="light"?r:s,n=320;return{logo:x`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      width: ${i[12]};
      height: ${i[12]};
      font-family: ${l.sans};
      gap: ${S.size[.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
    `,selectWrapper:x`
      width: 100%;
      max-width: ${n}px;
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    `,selectContainer:x`
      width: 100%;
    `,selectLabel:x`
      font-size: 0.875rem;
      font-weight: 500;
      color: ${o(e.gray[900],e.gray[100])};
      text-align: left;
    `,selectDescription:x`
      font-size: 0.8rem;
      color: ${o(e.gray[500],e.gray[400])};
      margin: 0;
      line-height: 1.3;
      text-align: left;
    `,select:x`
      appearance: none;
      width: 100%;
      padding: 0.5rem 3rem 0.5rem 0.75rem;
      border-radius: 0.375rem;
      background-color: ${o(e.gray[50],e.darkGray[800])};
      color: ${o(e.gray[900],e.gray[100])};
      border: 1px solid ${o(e.gray[200],e.gray[800])};
      font-size: 0.875rem;
      transition: all 0.15s ease;
      cursor: pointer;

      /* Custom arrow */
      background-image: url("data:image/svg+xml;utf8,<svg fill='%236b7280' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 1.25rem;

      &:hover {
        border-color: ${o(e.gray[300],e.gray[700])};
      }

      &:focus {
        outline: none;
        border-color: ${e.gray[400]};
        box-shadow: 0 0 0 3px ${o(e.gray[200],e.gray[800])};
      }
    `,inputWrapper:x`
      width: 100%;
      max-width: ${n}px;
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    `,inputContainer:x`
      width: 100%;
    `,inputLabel:x`
      font-size: 0.875rem;
      font-weight: 500;
      color: ${o(e.gray[900],e.gray[100])};
      text-align: left;
    `,inputDescription:x`
      font-size: 0.8rem;
      color: ${o(e.gray[500],e.gray[400])};
      margin: 0;
      line-height: 1.3;
      text-align: left;
    `,input:x`
      appearance: none;
      box-sizing: border-box;
      width: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      background-color: ${o(e.gray[50],e.darkGray[800])};
      color: ${o(e.gray[900],e.gray[100])};
      border: 1px solid ${o(e.gray[200],e.gray[800])};
      font-size: 0.875rem;
      font-family: ${l.mono};
      transition: all 0.15s ease;

      &::placeholder {
        color: ${o(e.gray[400],e.gray[500])};
      }

      &:hover {
        border-color: ${o(e.gray[300],e.gray[700])};
      }

      &:focus {
        outline: none;
        border-color: ${o(e.gray[400],e.gray[600])};
        box-shadow: 0 0 0 3px ${o(e.gray[200],e.gray[800])};
      }
    `,checkboxWrapper:x`
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      cursor: pointer;
      user-select: none;
      padding: 0.375rem;
      border-radius: 0.375rem;
      transition: background-color 0.15s ease;

      &:hover {
        background-color: ${o(e.gray[50],e.darkGray[900])};
      }
    `,checkboxContainer:x`
      width: 100%;
    `,checkboxLabelContainer:x`
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      flex: 1;
    `,checkbox:x`
      appearance: none;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid ${o(e.gray[300],e.gray[700])};
      border-radius: 0.25rem;
      background-color: ${o(e.gray[50],e.darkGray[800])};
      display: grid;
      place-items: center;
      transition: all 0.15s ease;
      flex-shrink: 0;
      margin-top: 0.125rem;

      &:hover {
        border-color: ${o(e.gray[400],e.gray[600])};
      }

      &:checked {
        background-color: ${o(e.gray[900],e.gray[100])};
        border-color: ${o(e.gray[900],e.gray[100])};
      }

      &:checked::after {
        content: '';
        width: 0.4rem;
        height: 0.6rem;
        border: solid ${o("#fff",e.gray[900])};
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        margin-top: -3px;
      }
    `,checkboxLabel:x`
      color: ${o(e.gray[900],e.gray[100])};
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.4;
      text-align: left;
    `,checkboxDescription:x`
      color: ${o(e.gray[500],e.gray[400])};
      font-size: 0.8rem;
      line-height: 1.3;
      text-align: left;
    `,button:{base:x`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: ${S.font.fontFamily.sans};
        font-size: 0.8rem;
        font-weight: 500;
        border-radius: 0.375rem;
        padding: 0.375rem 0.75rem;
        cursor: pointer;
        transition:
          background 0.15s,
          color 0.15s,
          border 0.15s,
          box-shadow 0.15s;
        outline: none;
        border-width: 1px;
        border-style: solid;
      `,variant(r,s,c){const g=Wt[r];return c?x`
            background: transparent;
            color: ${o(g.bg,g.bg)};
            border-color: transparent;
            &:hover {
              background: ${o(e.gray[100],e.darkGray[800])};
            }
            &:active {
              background: ${o(e.gray[200],e.darkGray[700])};
            }
          `:s?x`
            background: transparent;
            color: ${o(g.bg,g.bg)};
            border-color: ${o(g.bg,g.bg)};
            &:hover {
              background: ${o(e.gray[50],e.darkGray[800])};
              border-color: ${o(g.hover,g.hover)};
            }
            &:active {
              background: ${o(e.gray[100],e.darkGray[700])};
              border-color: ${o(g.active,g.active)};
            }
          `:x`
          background: ${o(g.bg,g.bg)};
          color: ${o(g.text,g.text)};
          border-color: ${o(g.border,g.border)};
          &:hover {
            background: ${o(g.hover,g.hover)};
            border-color: ${o(g.hover,g.hover)};
          }
          &:active {
            background: ${o(g.active,g.active)};
            border-color: ${o(g.active,g.active)};
          }
        `}},tag:{dot:r=>x`
        width: ${S.size[1.5]};
        height: ${S.size[1.5]};
        border-radius: ${S.border.radius.full};
        background-color: ${o(S.colors[r][500],S.colors[r][500])};
      `,base:x`
        display: flex;
        gap: ${S.size[1.5]};
        box-sizing: border-box;
        height: ${S.size[6.5]};
        background: ${o(e.gray[50],e.darkGray[500])};
        color: ${o(e.gray[700],e.gray[300])};
        border-radius: ${S.border.radius.sm};
        font-size: ${a.size.sm};
        padding: ${S.size[1]};
        padding-left: ${S.size[1.5]};
        align-items: center;
        font-weight: ${a.weight.medium};
        border: ${o("1px solid "+e.gray[300],"1px solid transparent")};
        user-select: none;
        position: relative;
        &:focus-visible {
          outline-offset: 2px;
          outline: 2px solid ${o(e.blue[700],e.blue[800])};
        }
      `,label:x`
        font-size: ${a.size.xs};
      `,count:x`
        font-size: ${a.size.xs};
        padding: 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${o(e.gray[500],e.gray[400])};
        background-color: ${o(e.gray[200],e.darkGray[300])};
        border-radius: 2px;
        font-variant-numeric: tabular-nums;
        height: ${S.size[4.5]};
      `},tree:{info:x`
        color: ${o(e.gray[500],e.gray[500])};
        font-size: ${a.size.xs};
        margin-right: ${i[1]};
      `,actionButton:x`
        background-color: transparent;
        color: ${o(e.gray[500],e.gray[500])};
        border: none;
        display: inline-flex;
        padding: 0px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: ${i[3]};
        height: ${i[3]};
        position: relative;
        z-index: 1;

        &:hover svg {
          color: ${o(e.gray[600],e.gray[400])};
        }

        &:focus-visible {
          border-radius: ${d.radius.xs};
          outline: 2px solid ${o(e.blue[700],e.blue[800])};
          outline-offset: 2px;
        }
      `,expanderContainer:x`
        position: relative;
      `,expander:x`
        position: absolute;
        cursor: pointer;
        left: -16px;
        top: 3px;
        & path {
          stroke: ${o(e.blue[400],e.blue[300])};
        }
        & svg {
          width: ${i[3]};
          height: ${i[3]};
        }

        display: inline-flex;
        align-items: center;
        transition: all 0.1s ease;
      `,expandedLine:r=>x`
        display: block;
        padding-left: 0.75rem;
        margin-left: -0.7rem;
        ${r?`border-left: 1px solid ${o(e.blue[400],e.blue[300])};`:""}
      `,collapsible:x`
        cursor: pointer;
        transition: all 0.2s ease;
        &:hover {
          background-color: ${o(e.gray[100],e.darkGray[700])};
          border-radius: ${S.border.radius.sm};
          padding: 0 ${S.size[1]};
        }
      `,actions:x`
        display: inline-flex;
        margin-left: ${i[2]};
        gap: ${i[2]};
        align-items: center;
        & svg {
          height: 12px;
          width: 12px;
        }
      `,valueCollapsed:x`
        color: ${o(e.gray[500],e.gray[400])};
      `,valueFunction:x`
        color: ${o(e.cyan[500],e.cyan[400])};
      `,valueString:x`
        color: ${o(e.green[500],e.green[400])};
      `,valueNumber:x`
        color: ${o(e.yellow[500],e.yellow[400])};
      `,valueBoolean:x`
        color: ${o(e.pink[500],e.pink[400])};
      `,valueNull:x`
        color: ${o(e.gray[500],e.gray[400])};
        font-style: italic;
      `,valueKey:x`
        color: ${o(e.blue[400],e.blue[300])};
      `,valueBraces:x`
        color: ${e.gray[500]};
      `,valueContainer:r=>x`
        display: block;
        margin-left: ${r?"0":"1rem"};

        &:not(:hover) .actions {
          display: none;
        }

        &:hover .actions {
          display: inline-flex;
        }
      `},header:{row:x`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${S.size[2]} ${S.size[2.5]};
        gap: ${S.size[2.5]};
        border-bottom: ${o(e.gray[300],e.darkGray[500])} 1px solid;
        align-items: center;
      `,logoAndToggleContainer:x`
        display: flex;
        gap: ${S.size[3]};
        align-items: center;
        & > button {
          padding: 0;
          background: transparent;
          border: none;
          display: flex;
          gap: ${i[.5]};
          flex-direction: column;
        }
      `,logo:x`
        cursor: pointer;
        display: flex;
        flex-direction: column;
        background-color: transparent;
        border: none;
        gap: ${S.size[.5]};
        padding: 0px;
        &:hover {
          opacity: 0.7;
        }
        &:focus-visible {
          outline-offset: 4px;
          border-radius: ${d.radius.xs};
          outline: 2px solid ${e.blue[800]};
        }
      `,tanstackLogo:x`
        font-size: ${a.size.md};
        font-weight: ${a.weight.bold};
        line-height: ${a.lineHeight.xs};
        white-space: nowrap;
        color: ${o(e.gray[700],e.gray[300])};
      `,flavorLogo:(r,s)=>x`
        font-weight: ${a.weight.semibold};
        font-size: ${a.size.xs};
        background: linear-gradient(to right, ${o(r,s)});
        background-clip: text;
        -webkit-background-clip: text;
        line-height: 1;
        -webkit-text-fill-color: transparent;
        white-space: nowrap;
      `},section:{main:x`
        margin-bottom: 1.5rem;
        padding: 1rem;
        background-color: ${o(e.gray[50],e.darkGray[800])};
        border: 1px solid ${o(e.gray[200],e.gray[800])};
        border-radius: 0.5rem;
        box-shadow: none;
      `,title:x`
        font-size: 1rem;
        font-weight: 600;
        color: ${o(e.gray[900],e.gray[100])};
        margin: 0 0 0.75rem 0;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid ${o(e.gray[200],e.gray[800])};
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-align: left;
      `,icon:x`
        height: 18px;
        width: 18px;
        & > svg {
          height: 100%;
          width: 100%;
        }
        color: ${o(e.gray[700],e.gray[400])};
      `,description:x`
        color: ${o(e.gray[500],e.gray[400])};
        font-size: 0.8rem;
        margin: 0 0 1rem 0;
        line-height: 1.4;
        text-align: left;
      `},mainPanel:{panel:r=>x`
        padding: ${r?S.size[3]:0};
        background: ${o(e.gray[50],e.darkGray[700])};
        overflow-y: auto;
        height: 100%;
      `}}};function ee(){const{theme:t}=Gt(),[e,a]=T(qe(t()));return L(()=>{a(qe(t()))}),e}var Kt=m("<div><label><input type=checkbox><div>"),Re=m("<span>");function le(t){const e=ee(),[a,i]=T(t.checked||!1),d=l=>{const o=l.target.checked;i(o),t.onChange?.(o)};return(()=>{var l=Kt(),o=l.firstChild,n=o.firstChild,r=n.nextSibling;return n.$$input=d,h(r,(()=>{var s=R(()=>!!t.label);return()=>s()&&(()=>{var c=Re();return h(c,()=>t.label),y(()=>p(c,e().checkboxLabel)),c})()})(),null),h(r,(()=>{var s=R(()=>!!t.description);return()=>s()&&(()=>{var c=Re();return h(c,()=>t.description),y(()=>p(c,e().checkboxDescription)),c})()})(),null),y(s=>{var c=e().checkboxContainer,g=e().checkboxWrapper,f=e().checkbox,C=e().checkboxLabelContainer;return c!==s.e&&p(l,s.e=c),g!==s.t&&p(o,s.t=g),f!==s.a&&p(n,s.a=f),C!==s.o&&p(r,s.o=C),s},{e:void 0,t:void 0,a:void 0,o:void 0}),y(()=>n.checked=a()),l})()}G(["input"]);var Zt=m("<div><div><input>"),Jt=m("<label>"),Xt=m("<p>");function ct(t){const e=ee(),[a,i]=T(t.value||""),d=l=>{const o=l.target.value;i(n=>n!==o?o:n),t.onChange?.(o)};return(()=>{var l=Zt(),o=l.firstChild,n=o.firstChild;return h(o,(()=>{var r=R(()=>!!t.label);return()=>r()&&(()=>{var s=Jt();return h(s,()=>t.label),y(()=>p(s,e().inputLabel)),s})()})(),n),h(o,(()=>{var r=R(()=>!!t.description);return()=>r()&&(()=>{var s=Xt();return h(s,()=>t.description),y(()=>p(s,e().inputDescription)),s})()})(),n),n.$$input=d,y(r=>{var s=e().inputContainer,c=e().inputWrapper,g=t.type||"text",f=e().input,C=t.placeholder;return s!==r.e&&p(l,r.e=s),c!==r.t&&p(o,r.t=c),g!==r.a&&Y(n,"type",r.a=g),f!==r.o&&p(n,r.o=f),C!==r.i&&Y(n,"placeholder",r.i=C),r},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),y(()=>n.value=a()),l})()}G(["input"]);var _t=m("<div><div><select>"),er=m("<label>"),tr=m("<p>"),rr=m("<option>");function we(t){const e=ee(),[a,i]=T(t.value||t.options[0]?.value),d=l=>{const o=l.target.value;i(n=>n!==o?o:n),t.onChange?.(o)};return(()=>{var l=_t(),o=l.firstChild,n=o.firstChild;return h(o,(()=>{var r=R(()=>!!t.label);return()=>r()&&(()=>{var s=er();return h(s,()=>t.label),y(()=>p(s,e().selectLabel)),s})()})(),n),h(o,(()=>{var r=R(()=>!!t.description);return()=>r()&&(()=>{var s=tr();return h(s,()=>t.description),y(()=>p(s,e().selectDescription)),s})()})(),n),n.$$input=d,h(n,()=>t.options.map(r=>(()=>{var s=rr();return h(s,()=>r.label),y(()=>s.value=r.value),s})())),y(r=>{var s=e().selectContainer,c=e().selectWrapper,g=e().select;return s!==r.e&&p(l,r.e=s),c!==r.t&&p(o,r.t=c),g!==r.a&&p(n,r.a=g),r},{e:void 0,t:void 0,a:void 0}),y(()=>n.value=a()),l})()}G(["input"]);var nr=m('<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M8 6h10"></path><path d="M6 12h9"></path><path d="M11 18h7">'),ar=m('<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="lucide lucide-file-search2-icon lucide-file-search-2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><circle cx=11.5 cy=14.5 r=2.5></circle><path d="M13.3 16.3 15 18">'),or=m('<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path><path d="M12 2v2"></path><path d="M12 22v-2"></path><path d="m17 20.66-1-1.73"></path><path d="M11 10.27 7 3.34"></path><path d="m20.66 17-1.73-1"></path><path d="m3.34 7 1.73 1"></path><path d="M14 12h8"></path><path d="M2 12h2"></path><path d="m20.66 7-1.73 1"></path><path d="m3.34 17 1.73-1"></path><path d="m17 3.34-1 1.73"></path><path d="m11 13.73-4 6.93">'),dt=m('<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="m10 9-3 3 3 3"></path><path d="m14 15 3-3-3-3"></path><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719">'),ir=m('<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M10 8h.01"></path><path d="M12 12h.01"></path><path d="M14 8h.01"></path><path d="M16 12h.01"></path><path d="M18 8h.01"></path><path d="M6 8h.01"></path><path d="M7 16h10"></path><path d="M8 12h.01"></path><rect width=20 height=16 x=2 y=4 rx=2>'),lr=m('<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx=12 cy=10 r=3>'),sr=m('<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1=8 x2=16 y1=12 y2=12>'),cr=m('<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M18 6 6 18"></path><path d="m6 6 12 12">'),dr=m('<svg width=20 height=20 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16.5 9.39999L7.5 4.20999M12 17.5L12 3M21 16V7.99999C20.9996 7.64926 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.26999L13 2.26999C12.696 2.09446 12.3511 2.00204 12 2.00204C11.6489 2.00204 11.304 2.09446 11 2.26999L4 6.26999C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64926 3 7.99999V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),gr=m('<svg width=18 height=18 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.76489 14.1003 1.98232 16.07 2.85999M22 4L12 14.01L9 11.01"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),ur=m('<svg width=18 height=18 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),pr=m('<svg width=20 height=20 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 9L12 15L18 9"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),hr=m('<svg width=18 height=18 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),fr=m('<svg width=12 height=12 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M21 13V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H11M15 3H21M21 3V9M21 3L10 14"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),mr=m('<svg width=20 height=20 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),vr=m('<svg width=20 height=20 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M18 6L6 18M6 6L18 18"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>'),br=m('<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M2 10h6V4"></path><path d="m2 4 6 6"></path><path d="M21 10V7a2 2 0 0 0-2-2h-7"></path><path d="M3 14v2a2 2 0 0 0 2 2h3"></path><rect x=12 y=14 width=10 height=7 rx=1>');function yr(){return nr()}function kr(){return ar()}function wr(){return or()}function Cr(){return dt()}function xr(){return ir()}function Mr(){return lr()}function Sr(){return dt()}function $r(){return sr()}function Er(){return cr()}function Ar(){return dr()}function Pr(){return gr()}function Tr(){return ur()}function Br(){return pr()}function zr(){return hr()}function Ir(){return fr()}function Fr(){return mr()}function Lr(){return vr()}function Dr(){return br()}var Hr=m("<button>");function gt(t){const e=ee(),[a,i]=St(t,["variant","outline","ghost","children","className"]),d=a.variant||"primary",l=O(e().button.base,e().button.variant(d,a.outline,a.ghost),a.className);return(()=>{var o=Hr();return ue(o,pe(i,{class:l}),!1),h(o,()=>a.children),o})()}var Nr=m("<div>");const ut=({className:t,children:e,class:a,withPadding:i})=>{const d=ee();return(()=>{var l=Nr();return h(l,e),y(()=>p(l,O(d().mainPanel.panel(!!i),t,a))),l})()};var Ur=m("<section>"),Or=m("<h3>"),Qr=m("<p>"),qr=m("<span>");const se=({children:t,...e})=>{const a=ee();return(()=>{var i=Ur();return ue(i,pe({get class(){return O(a().section.main,e.class)}},e),!1),h(i,t),i})()},ce=({children:t,...e})=>{const a=ee();return(()=>{var i=Or();return ue(i,pe({get class(){return O(a().section.title,e.class)}},e),!1),h(i,t),i})()},de=({children:t,...e})=>{const a=ee();return(()=>{var i=Qr();return ue(i,pe({get class(){return O(a().section.description,e.class)}},e),!1),h(i,t),i})()},ge=({children:t,...e})=>{const a=ee();return(()=>{var i=qr();return ue(i,pe({get class(){return O(a().section.icon,e.class)}},e),!1),h(i,t),i})()};class Rr{#o=!0;#t;#e;#g;#r;#l;#n;#s;#u=0;#h=5;#i=!1;#c=!1;#a=null;#p=()=>{this.debugLog("Connected to event bus"),this.#l=!0,this.#i=!1,this.debugLog("Emitting queued events",this.#r),this.#r.forEach(e=>this.emitEventToBus(e)),this.#r=[],this.stopConnectLoop(),this.#e().removeEventListener("tanstack-connect-success",this.#p)};#d=()=>{if(this.#u<this.#h){this.#u++,this.dispatchCustomEvent("tanstack-connect",{});return}this.#e().removeEventListener("tanstack-connect",this.#d),this.#c=!0,this.debugLog("Max retries reached, giving up on connection"),this.stopConnectLoop()};#f=()=>{this.#i||(this.#i=!0,this.#e().addEventListener("tanstack-connect-success",this.#p),this.#d())};constructor({pluginId:e,debug:a=!1,enabled:i=!0,reconnectEveryMs:d=300}){this.#t=e,this.#o=i,this.#e=this.getGlobalTarget,this.#g=a,this.debugLog(" Initializing event subscription for plugin",this.#t),this.#r=[],this.#l=!1,this.#c=!1,this.#n=null,this.#s=d}startConnectLoop(){this.#n!==null||this.#l||(this.debugLog(`Starting connect loop (every ${this.#s}ms)`),this.#n=setInterval(this.#d,this.#s))}stopConnectLoop(){this.#i=!1,this.#n!==null&&(clearInterval(this.#n),this.#n=null,this.#r=[],this.debugLog("Stopped connect loop"))}debugLog(...e){this.#g&&console.log(`🌴 [tanstack-devtools:${this.#t}-plugin]`,...e)}getGlobalTarget(){if(typeof globalThis<"u"&&globalThis.__TANSTACK_EVENT_TARGET__)return this.debugLog("Using global event target"),globalThis.__TANSTACK_EVENT_TARGET__;if(typeof window<"u"&&typeof window.addEventListener<"u")return this.debugLog("Using window as event target"),window;const e=typeof EventTarget<"u"?new EventTarget:void 0;return typeof e>"u"||typeof e.addEventListener>"u"?(this.debugLog("No event mechanism available, running in non-web environment"),{addEventListener:()=>{},removeEventListener:()=>{},dispatchEvent:()=>!1}):(this.debugLog("Using new EventTarget as fallback"),e)}getPluginId(){return this.#t}dispatchCustomEventShim(e,a){try{const i=new Event(e,{detail:a});this.#e().dispatchEvent(i)}catch{this.debugLog("Failed to dispatch shim event")}}dispatchCustomEvent(e,a){try{this.#e().dispatchEvent(new CustomEvent(e,{detail:a}))}catch{this.dispatchCustomEventShim(e,a)}}emitEventToBus(e){this.debugLog("Emitting event to client bus",e),this.dispatchCustomEvent("tanstack-dispatch-event",e)}createEventPayload(e,a){return{type:`${this.#t}:${e}`,payload:a,pluginId:this.#t}}emit(e,a){if(!this.#o){this.debugLog("Event bus client is disabled, not emitting event",e,a);return}if(this.#a&&(this.debugLog("Emitting event to internal event target",e,a),this.#a.dispatchEvent(new CustomEvent(`${this.#t}:${e}`,{detail:this.createEventPayload(e,a)}))),this.#c){this.debugLog("Previously failed to connect, not emitting to bus");return}if(!this.#l){this.debugLog("Bus not available, will be pushed as soon as connected"),this.#r.push(this.createEventPayload(e,a)),typeof CustomEvent<"u"&&!this.#i&&(this.#f(),this.startConnectLoop());return}return this.emitEventToBus(this.createEventPayload(e,a))}on(e,a,i){const d=i?.withEventTarget??!1,l=`${this.#t}:${e}`;if(d&&(this.#a||(this.#a=new EventTarget),this.#a.addEventListener(l,n=>{a(n.detail)})),!this.#o)return this.debugLog("Event bus client is disabled, not registering event",l),()=>{};const o=n=>{this.debugLog("Received event from bus",n.detail),a(n.detail)};return this.#e().addEventListener(l,o),this.debugLog("Registered event to bus",l),()=>{d&&this.#a?.removeEventListener(l,o),this.#e().removeEventListener(l,o)}}onAll(e){if(!this.#o)return this.debugLog("Event bus client is disabled, not registering event"),()=>{};const a=i=>{const d=i.detail;e(d)};return this.#e().addEventListener("tanstack-devtools-global",a),()=>this.#e().removeEventListener("tanstack-devtools-global",a)}onAllPluginEvents(e){if(!this.#o)return this.debugLog("Event bus client is disabled, not registering event"),()=>{};const a=i=>{const d=i.detail;this.#t&&d.pluginId!==this.#t||e(d)};return this.#e().addEventListener("tanstack-devtools-global",a),()=>this.#e().removeEventListener("tanstack-devtools-global",a)}}class jr extends Rr{constructor(){super({pluginId:"tanstack-devtools-core"})}}const K=new jr;function Vr(t){const e={...t},a={...t},i={},d=o=>{let n=i[o];if(!n){if(!At())return e[o];i[o]=n=T(e[o],{internal:!0}),delete e[o]}return n[0]()};for(const o in t)Object.defineProperty(a,o,{get:()=>d(o),enumerable:!0});const l=(o,n)=>{const r=i[o];if(r)return r[1](n);o in e&&(e[o]=Ne(n,e[o]))};return[a,(o,n)=>{if(Dt(o)){const r=$t(()=>Object.entries(Ne(o,a)));Et(()=>{for(const[s,c]of r)l(s,()=>c)})}else l(o,n);return a}]}const pt={width:null,height:null};function Ce(t){if(!t)return{...pt};const{width:e,height:a}=t.getBoundingClientRect();return{width:e,height:a}}function Yr(t){const e=typeof t=="function",[a,i]=Vr(Pt.context||e?pt:Ce(t)),d=new ResizeObserver(([l])=>i(Ce(l.target)));return X(()=>d.disconnect()),e?L(()=>{const l=t();l&&(i(Ce(l)),d.observe(l),X(()=>d.unobserve(l)))}):(d.observe(t),X(()=>d.unobserve(t))),a}var Gr=t=>{const[e,a]=T(!1),[i,d]=T(!1),l=D(()=>e()||i());let o=null;return X(()=>{o&&clearTimeout(o)}),{expanded:l,setForceExpand:d,hoverUtils:{enter:()=>{o&&(clearTimeout(o),o=null),a(!0)},leave:()=>{o=setTimeout(()=>{a(!1)},t.animationMs)}},animationMs:t.animationMs}},ht=nt(void 0),Wr=t=>{const e=Gr({animationMs:t.animationMs});return u(ht.Provider,{value:e,get children(){return t.children}})};function Pe(){const t=Me(ht);if(t===void 0)throw new Error("useDrawContext must be used within a DrawClientProvider");return t}var Te=()=>{const t=Me(Bt);if(t===void 0)throw new Error("useDevtoolsShellContext must be used within a ShellContextProvider");return t};function Be(){const{settings:t,setSettings:e}=ae();return{theme:D(()=>t().theme),setTheme:i=>e({theme:i})}}var ft=()=>{const{store:t,setStore:e}=Te(),{setForceExpand:a}=Pe(),i=D(()=>t.plugins),d=D(()=>t.state.activePlugins);return L(()=>{d().length===0?a(!0):a(!1)}),{plugins:i,toggleActivePlugins:o=>{e(n=>{const r=n.state.activePlugins.includes(o),s=t.plugins?.find(g=>g.id===o);s?.destroy&&r&&s.destroy(o);const c=r?n.state.activePlugins.filter(g=>g!==o):[...n.state.activePlugins,o];return c.length>Lt?n:{...n,state:{...n.state,activePlugins:c}}})},activePlugins:d}},ke=()=>{const{store:t,setStore:e}=Te();return{state:D(()=>t.state),setState:d=>{e(l=>({...l,state:{...l.state,...d}}))}}},ae=()=>{const{store:t,setStore:e}=Te(),a=D(()=>t.settings);return{setSettings:d=>{e(l=>({...l,settings:{...l.settings,...d}}))},settings:a}},Kr=()=>{const{state:t,setState:e}=ke();return{persistOpen:D(()=>t().persistOpen),setPersistOpen:d=>{e({persistOpen:d})}}},mt=()=>{const{state:t,setState:e}=ke();return{height:D(()=>t().height),setHeight:d=>{e({height:d})}}},vt=(t,e=!0)=>{e?t.setAttribute("tabIndex","-1"):t.removeAttribute("tabIndex");for(const a of t.children)vt(a,e)},Zr=t=>{L(()=>{const e=document.getElementById($e);e&&vt(e,!t())})},Jr=t=>t.includes("CtrlOrMeta")?[t.map(e=>e==="CtrlOrMeta"?"Control":e),t.map(e=>e==="CtrlOrMeta"?"Meta":e)]:[t],bt=t=>Jr(t).flatMap(a=>{const i=a.filter(o=>Fe.includes(o)),d=a.filter(o=>!Fe.includes(o));return i.length===0?[d]:Ft(i).map(o=>[...o,...d])}),Xr=(t,e)=>{const a=bt(e),i=t.map(d=>d.toUpperCase());return a.some(d=>d.every(l=>i.includes(String(l).toUpperCase()))&&i.every(l=>d.map(o=>String(o).toUpperCase()).includes(l)))},_r={colors:{black:"#000000",white:"#ffffff",darkGray:{600:"#212530",700:"#191c24",800:"#111318",900:"#0b0d10"},gray:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},blue:{100:"#D1E9FF",300:"#84CAFF",400:"#53B1FD",500:"#2E90FA",600:"#1570EF",700:"#175CD3",800:"#1849A9",900:"#194185"},green:{100:"#D1FADF",300:"#6CE9A6",400:"#32D583",500:"#12B76A",600:"#039855",700:"#027A48",900:"#054F31"},red:{100:"#fee2e2",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c"},purple:{200:"#D9D6FE",800:"#4A1FB8"}},font:{size:{xs:"calc(var(--tsrd-font-size) * 0.75)",sm:"calc(var(--tsrd-font-size) * 0.875)"},fontFamily:{sans:"ui-sans-serif, Inter, system-ui, sans-serif, sans-serif"}},border:{radius:{full:"9999px"}},size:{2:"calc(var(--tsrd-font-size) * 0.5)",3:"calc(var(--tsrd-font-size) * 0.75)",10:"calc(var(--tsrd-font-size) * 2.5)",48:"calc(var(--tsrd-font-size) * 12)"}},je=t=>`${(t/1e3).toFixed(2)}s`,Ve=t=>{const{colors:e,font:a,size:i,border:d}=_r,{fontFamily:l,size:o}=a,n=ye,r=(s,c)=>t==="light"?s:c;return{seoTabContainer:n`
      padding: 0;
      margin: 0 auto;
      background: ${r(e.white,e.darkGray[700])};
      border-radius: 8px;
      box-shadow: none;
      overflow-y: auto;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 0;
      width: 100%;
      overflow-y: auto;
    `,seoTabTitle:n`
      font-size: 1.25rem;
      font-weight: 600;
      color: ${r(e.gray[900],e.gray[100])};
      margin: 0;
      padding: 1rem 1.5rem 0.5rem 1.5rem;
      text-align: left;
      border-bottom: 1px solid ${r(e.gray[200],e.gray[800])};
    `,seoTabSection:n`
      padding: 1.5rem;
      background: ${r(e.gray[50],e.darkGray[800])};
      border: 1px solid ${r(e.gray[200],e.gray[800])};
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 2rem;
      border-radius: 0.75rem;
    `,seoPreviewSection:n`
      display: flex;
      flex-direction: row;
      gap: 16px;
      margin-bottom: 0;
      justify-content: flex-start;
      align-items: flex-start;
      overflow-x: auto;
      flex-wrap: wrap;
      padding-bottom: 0.5rem;
    `,seoPreviewCard:n`
      border: 1px solid ${r(e.gray[200],e.gray[800])};
      border-radius: 8px;
      padding: 12px 10px;
      background: ${r(e.white,e.darkGray[900])};
      margin-bottom: 0;
      box-shadow: 0 1px 3px ${r("rgba(0,0,0,0.05)","rgba(0,0,0,0.1)")};
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-width: 200px;
      max-width: 240px;
      font-size: 0.95rem;
      gap: 4px;
    `,seoPreviewHeader:n`
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 0;
      color: ${r(e.gray[700],e.gray[300])};
    `,seoPreviewImage:n`
      max-width: 100%;
      border-radius: 6px;
      margin-bottom: 6px;
      box-shadow: 0 1px 2px ${r("rgba(0,0,0,0.03)","rgba(0,0,0,0.06)")};
      height: 160px;
      object-fit: cover;
    `,seoPreviewTitle:n`
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 4px;
      color: ${r(e.gray[900],e.gray[100])};
    `,seoPreviewDesc:n`
      color: ${r(e.gray[600],e.gray[400])};
      margin-bottom: 4px;
      font-size: 0.8rem;
    `,seoPreviewUrl:n`
      color: ${r(e.gray[500],e.gray[500])};
      font-size: 0.75rem;
      margin-bottom: 0;
      word-break: break-all;
    `,seoMissingTagsSection:n`
      margin-top: 4px;
      font-size: 0.875rem;
      color: ${r(e.red[500],e.red[400])};
    `,seoMissingTagsList:n`
      margin: 4px 0 0 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      max-width: 240px;
    `,seoMissingTag:n`
      background: ${r(e.red[100],e.red[500]+"22")};
      color: ${r(e.red[700],e.red[500])};
      border-radius: 3px;
      padding: 2px 6px;
      font-size: 0.75rem;
      font-weight: 500;
    `,seoAllTagsFound:n`
      color: ${r(e.green[700],e.green[500])};
      font-weight: 500;
      margin-left: 0;
      padding: 0 10px 8px 10px;
      font-size: 0.875rem;
    `,devtoolsPanelContainer:(s,c)=>n`
      direction: ltr;
      position: fixed;
      overflow-y: hidden;
      overflow-x: hidden;
      ${s}: 0;
      right: 0;
      z-index: 99999;
      width: 100%;
      ${c?"":"max-height: 90%;"}
      border-top: 1px solid ${r(e.gray[200],e.gray[800])};
      transform-origin: top;
    `,devtoolsPanelContainerVisibility:s=>n`
        visibility: ${s?"visible":"hidden"};
        height: ${s?"auto":"0"};
      `,devtoolsPanelContainerResizing:s=>s()?n`
          transition: none;
        `:n`
        transition: all 0.4s ease;
      `,devtoolsPanelContainerAnimation:(s,c,g)=>s?n`
          pointer-events: auto;
          transform: translateY(0);
        `:n`
        pointer-events: none;
        transform: translateY(${g==="top"?-c:c}px);
      `,devtoolsPanel:n`
      display: flex;
      font-size: ${o.sm};
      font-family: ${l.sans};
      background-color: ${r(e.white,e.darkGray[700])};
      color: ${r(e.gray[900],e.gray[300])};
      width: w-screen;
      flex-direction: row;
      overflow-x: hidden;
      overflow-y: hidden;
      height: 100%;
    `,dragHandle:s=>n`
      position: absolute;
      left: 0;
      ${s==="bottom"?"top":"bottom"}: 0;
      width: 100%;
      height: 4px;
      cursor: row-resize;
      user-select: none;
      z-index: 100000;
      &:hover {
        background-color: ${r(e.gray[400],e.gray[500])};
      }
    `,mainCloseBtn:n`
      background: transparent;
      position: fixed;
      z-index: 99999;
      display: inline-flex;
      width: fit-content;
      cursor: pointer;
      appearance: none;
      border: 0;
      align-items: center;
      padding: 0;
      font-size: ${a.size.xs};
      cursor: pointer;
      transition: all 0.25s ease-out;
      & > img {
        width: 56px;
        height: 56px;
        transition: all 0.3s ease;
        outline-offset: 2px;
        border-radius: ${d.radius.full};
        outline: 2px solid transparent;
      }
      &:hide-until-hover {
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      }
      &:hide-until-hover:hover {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
      }
      & > img:focus-visible,
      img:hover {
        outline: 2px solid ${r(e.black,e.black)};
      }
    `,mainCloseBtnPosition:s=>n`
        ${s==="top-left"?`top: ${i[2]}; left: ${i[2]};`:""}
        ${s==="top-right"?`top: ${i[2]}; right: ${i[2]};`:""}
        ${s==="middle-left"?`top: 50%; left: ${i[2]}; transform: translateY(-50%);`:""}
        ${s==="middle-right"?`top: 50%; right: ${i[2]}; transform: translateY(-50%);`:""}
        ${s==="bottom-left"?`bottom: ${i[2]}; left: ${i[2]};`:""}
        ${s==="bottom-right"?`bottom: ${i[2]}; right: ${i[2]};`:""}
      `,mainCloseBtnAnimation:(s,c)=>s?n`
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      `:c?n`
              opacity: 0;

              &:hover {
                opacity: 1;
                pointer-events: auto;
                visibility: visible;
              }
            `:n`
              opacity: 1;
              pointer-events: auto;
              visibility: visible;
            `,tabContainer:n`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      height: 100%;
      background-color: ${r(e.gray[50],e.darkGray[900])};
      border-right: 1px solid ${r(e.gray[200],e.gray[800])};
      box-shadow: none;
      position: relative;
      width: ${i[10]};
    `,tab:n`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: ${i[10]};
      cursor: pointer;
      font-size: ${o.sm};
      font-family: ${l.sans};
      color: ${r(e.gray[600],e.gray[400])};
      background-color: transparent;
      border: none;
      transition: all 0.15s ease;
      border-left: 2px solid transparent;
      &:hover:not(.close):not(.active):not(.detach) {
        background-color: ${r(e.gray[100],e.gray[800])};
        color: ${r(e.gray[900],e.gray[100])};
        border-left: 2px solid ${r(e.gray[900],e.gray[100])};
      }
      &.active {
        background-color: ${r(e.gray[100],e.gray[800])};
        color: ${r(e.gray[900],e.gray[100])};
        border-left: 2px solid ${r(e.gray[900],e.gray[100])};
      }
      &.detach {
        &:hover {
          background-color: ${r(e.gray[100],e.gray[800])};
        }
        &:hover {
          color: ${r(e.green[700],e.green[500])};
        }
      }
      &.close {
        margin-top: auto;
        &:hover {
          background-color: ${r(e.gray[100],e.gray[800])};
        }
        &:hover {
          color: ${r(e.red[700],e.red[500])};
        }
      }
      &.disabled {
        cursor: not-allowed;
        opacity: 0.2;
        pointer-events: none;
      }
      &.disabled:hover {
        background-color: transparent;
        color: ${e.gray[300]};
      }
    `,tabContent:n`
      transition: all 0.2s ease-in-out;
      width: 100%;
      height: 100%;
    `,pluginsTabPanel:n`
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      overflow: hidden;
    `,pluginsTabDraw:s=>n`
      width: ${s?i[48]:0};
      height: 100%;
      background-color: ${r(e.white,e.darkGray[900])};
      box-shadow: none;
      ${s?`border-right: 1px solid ${r(e.gray[200],e.gray[800])};`:""}
    `,pluginsTabDrawExpanded:n`
      width: ${i[48]};
      border-right: 1px solid ${r(e.gray[200],e.gray[800])};
    `,pluginsTabDrawTransition:s=>n`
        transition: width ${je(s)} ease;
      `,pluginsTabSidebar:s=>n`
      width: ${i[48]};
      overflow-y: auto;
      transform: ${s?"translateX(0)":"translateX(-100%)"};
      display: flex;
      flex-direction: column;
    `,pluginsTabSidebarTransition:s=>n`
        transition: transform ${je(s)} ease;
      `,pluginsList:n`
      flex: 1;
      overflow-y: auto;
    `,pluginName:n`
      font-size: ${o.xs};
      font-family: ${l.sans};
      color: ${r(e.gray[600],e.gray[400])};
      padding: ${i[2]};
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
      border-left: 2px solid transparent;

      &:hover {
        background-color: ${r(e.gray[100],e.gray[800])};
        color: ${r(e.gray[900],e.gray[100])};
        padding: ${i[2]};
      }
      &.active {
        background-color: ${r(e.gray[100],e.gray[800])};
        color: ${r(e.gray[900],e.gray[100])};
        border-left: 2px solid ${r(e.gray[900],e.gray[100])};
      }
      &.active:hover {
        background-color: ${r(e.gray[200],e.gray[700])};
      }
    `,pluginsTabContent:n`
      width: 100%;
      height: 100%;
      overflow-y: auto;

      &:not(:last-child) {
        border-right: 5px solid ${r(e.purple[200],e.purple[800])};
      }
    `,settingsGroup:n`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    `,conditionalSetting:n`
      margin-left: 1.5rem;
      padding-left: 1rem;
      border-left: 2px solid ${r(e.gray[300],e.gray[600])};
      background-color: ${r(e.gray[50],e.darkGray[900])};
      padding: 0.75rem;
      border-radius: 0.375rem;
      margin-top: 0.5rem;
    `,settingRow:n`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    `,settingsModifiers:n`
      display: flex;
      gap: 0.5rem;
    `,settingsStack:n`
      display: flex;
      flex-direction: column;
      gap: 1rem;
    `,noPluginsFallback:n`
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      padding: 2rem;
      background: ${r(e.gray[50],e.darkGray[700])};
      width: 100%;
      height: 100%;
    `,noPluginsFallbackContent:n`
      max-width: 600px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    `,noPluginsFallbackIcon:n`
      width: 64px;
      height: 64px;
      color: ${r(e.gray[400],e.gray[600])};
      margin-bottom: 0.5rem;

      svg {
        width: 100%;
        height: 100%;
      }
    `,noPluginsFallbackTitle:n`
      font-size: 1.5rem;
      font-weight: 600;
      color: ${r(e.gray[900],e.gray[100])};
      margin: 0;
    `,noPluginsFallbackDescription:n`
      font-size: 0.95rem;
      color: ${r(e.gray[600],e.gray[400])};
      line-height: 1.5;
      margin: 0;
    `,noPluginsSuggestions:n`
      width: 100%;
      margin-top: 1.5rem;
      padding: 1.5rem;
      background: ${r(e.white,e.darkGray[800])};
      border: 1px solid ${r(e.gray[200],e.gray[700])};
      border-radius: 0.5rem;
    `,noPluginsSuggestionsTitle:n`
      font-size: 1.125rem;
      font-weight: 600;
      color: ${r(e.gray[900],e.gray[100])};
      margin: 0 0 0.5rem 0;
    `,noPluginsSuggestionsDesc:n`
      font-size: 0.875rem;
      color: ${r(e.gray[600],e.gray[400])};
      margin: 0 0 1rem 0;
    `,noPluginsSuggestionsList:n`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    `,noPluginsSuggestionCard:n`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: ${r(e.gray[50],e.darkGray[900])};
      border: 1px solid ${r(e.gray[200],e.gray[700])};
      border-radius: 0.375rem;
      transition: all 0.15s ease;

      &:hover {
        border-color: ${r(e.gray[300],e.gray[600])};
        background: ${r(e.gray[100],e.darkGray[800])};
      }
    `,noPluginsSuggestionInfo:n`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
      flex: 1;
    `,noPluginsSuggestionPackage:n`
      font-size: 0.95rem;
      font-weight: 600;
      color: ${r(e.gray[900],e.gray[100])};
      margin: 0;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    `,noPluginsSuggestionSource:n`
      font-size: 0.8rem;
      color: ${r(e.gray[500],e.gray[500])};
      margin: 0;
    `,noPluginsSuggestionStatus:n`
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: ${r(e.green[600],e.green[400])};

      svg {
        width: 18px;
        height: 18px;
      }
    `,noPluginsSuggestionStatusText:n`
      font-size: 0.875rem;
      font-weight: 500;
    `,noPluginsSuggestionStatusTextError:n`
      font-size: 0.875rem;
      font-weight: 500;
      color: ${r(e.red[600],e.red[400])};
    `,noPluginsEmptyState:n`
      margin-top: 1.5rem;
      padding: 1.5rem;
      background: ${r(e.white,e.darkGray[800])};
      border: 1px solid ${r(e.gray[200],e.gray[700])};
      border-radius: 0.5rem;
    `,noPluginsEmptyStateText:n`
      font-size: 0.875rem;
      color: ${r(e.gray[600],e.gray[400])};
      margin: 0;
      line-height: 1.5;
    `,noPluginsFallbackLinks:n`
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-top: 1.5rem;
    `,noPluginsFallbackLink:n`
      font-size: 0.875rem;
      color: ${r(e.gray[700],e.gray[300])};
      text-decoration: none;
      transition: color 0.15s ease;

      &:hover {
        color: ${r(e.gray[900],e.gray[100])};
        text-decoration: underline;
      }
    `,noPluginsFallbackLinkSeparator:n`
      color: ${r(e.gray[400],e.gray[600])};
    `,pluginMarketplace:n`
      width: 100%;
      overflow-y: auto;
      padding: 2rem;
      background: ${r("linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)","linear-gradient(135deg, #1a1d23 0%, #13161a 100%)")};
      animation: fadeIn 0.3s ease;

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,pluginMarketplaceHeader:n`
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid ${r(e.gray[200],e.gray[700])};
    `,pluginMarketplaceTitleRow:n`
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      margin-bottom: 0.5rem;
    `,pluginMarketplaceTitle:n`
      font-size: 1.5rem;
      font-weight: 700;
      color: ${r(e.gray[900],e.gray[100])};
      margin: 0;
      letter-spacing: -0.02em;
    `,pluginMarketplaceDescription:n`
      font-size: 0.95rem;
      color: ${r(e.gray[600],e.gray[400])};
      margin: 0 0 1rem 0;
      line-height: 1.5;
    `,pluginMarketplaceSearchWrapper:n`
      position: relative;
      display: flex;
      align-items: center;
      max-width: 400px;
      flex-shrink: 0;

      svg {
        position: absolute;
        left: 1rem;
        color: ${r(e.gray[400],e.gray[500])};
        pointer-events: none;
      }
    `,pluginMarketplaceSearch:n`
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.75rem;
      background: ${r(e.gray[50],e.darkGray[900])};
      border: 2px solid ${r(e.gray[200],e.gray[700])};
      border-radius: 0.5rem;
      color: ${r(e.gray[900],e.gray[100])};
      font-size: 0.875rem;
      font-family: ${l.sans};
      transition: all 0.2s ease;

      &::placeholder {
        color: ${r(e.gray[400],e.gray[500])};
      }

      &:focus {
        outline: none;
        border-color: ${r(e.blue[500],e.blue[400])};
        background: ${r(e.white,e.darkGray[800])};
        box-shadow: 0 0 0 3px
          ${r("rgba(59, 130, 246, 0.1)","rgba(96, 165, 250, 0.1)")};
      }
    `,pluginMarketplaceFilters:n`
      margin-top: 1.5rem;
      padding-top: 1rem;
    `,pluginMarketplaceTagsContainer:n`
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1.5rem;
      padding: 1rem;
      background: ${r(e.gray[50],e.darkGray[800])};
      border: 1px solid ${r(e.gray[200],e.gray[700])};
      border-radius: 0.5rem;
    `,pluginMarketplaceTagButton:n`
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      background: ${r(e.white,e.darkGray[700])};
      border: 2px solid ${r(e.gray[300],e.gray[600])};
      border-radius: 0.375rem;
      color: ${r(e.gray[700],e.gray[300])};
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        background: ${r(e.gray[100],e.darkGray[600])};
        border-color: ${r(e.gray[400],e.gray[500])};
        color: ${r(e.gray[900],e.gray[100])};
      }
    `,pluginMarketplaceTagButtonActive:n`
      background: ${r("linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)","linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)")} !important;
      border-color: ${r("#2563eb","#3b82f6")} !important;
      color: white !important;

      &:hover {
        background: ${r("linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)","linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)")} !important;
        border-color: ${r("#1d4ed8","#2563eb")} !important;
      }
    `,pluginMarketplaceSettingsButton:n`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem;
      background: ${r(e.gray[100],e.darkGray[800])};
      border: 2px solid ${r(e.gray[200],e.gray[700])};
      border-radius: 0.5rem;
      color: ${r(e.gray[700],e.gray[300])};
      cursor: pointer;
      transition: all 0.2s ease;
      margin-left: 0.5rem;

      &:hover {
        background: ${r(e.gray[200],e.darkGray[700])};
        border-color: ${r(e.gray[300],e.gray[600])};
        color: ${r(e.gray[900],e.gray[100])};
      }

      &:active {
        transform: scale(0.95);
      }
    `,pluginMarketplaceSettingsPanel:n`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 350px;
      background: ${r(e.white,e.darkGray[800])};
      border-left: 1px solid ${r(e.gray[200],e.gray[700])};
      box-shadow: -4px 0 12px ${r("rgba(0, 0, 0, 0.1)","rgba(0, 0, 0, 0.4)")};
      z-index: 1000;
      display: flex;
      flex-direction: column;
      animation: slideInRight 0.3s ease;

      @keyframes slideInRight {
        from {
          transform: translateX(100%);
        }
        to {
          transform: translateX(0);
        }
      }
    `,pluginMarketplaceSettingsPanelHeader:n`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;
      border-bottom: 1px solid ${r(e.gray[200],e.gray[700])};
    `,pluginMarketplaceSettingsPanelTitle:n`
      font-size: 1.125rem;
      font-weight: 600;
      color: ${r(e.gray[900],e.gray[100])};
      margin: 0;
    `,pluginMarketplaceSettingsPanelClose:n`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      background: transparent;
      border: none;
      color: ${r(e.gray[600],e.gray[400])};
      cursor: pointer;
      border-radius: 0.375rem;
      transition: all 0.15s ease;

      &:hover {
        background: ${r(e.gray[100],e.darkGray[700])};
        color: ${r(e.gray[900],e.gray[100])};
      }
    `,pluginMarketplaceSettingsPanelContent:n`
      flex: 1;
      padding: 1.5rem;
      overflow-y: auto;
    `,pluginMarketplaceGrid:n`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.25rem;
      animation: slideUp 0.4s ease;

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,pluginMarketplaceCard:n`
      background: ${r(e.white,e.darkGray[800])};
      border: 2px solid ${r(e.gray[200],e.gray[700])};
      border-radius: 0.75rem;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: ${r("linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)","linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)")};
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.25s ease;
      }

      &:hover {
        border-color: ${r(e.gray[400],e.gray[500])};
        box-shadow: 0 8px 24px ${r("rgba(0,0,0,0.1)","rgba(0,0,0,0.4)")};
        transform: translateY(-4px);

        &::before {
          transform: scaleX(1);
        }
      }
    `,pluginMarketplaceCardIcon:n`
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${r("linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)","linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)")};
      border-radius: 0.5rem;
      color: white;
      transition: transform 0.25s ease;

      svg {
        width: 20px;
        height: 20px;
      }

      &.custom-logo {
      }
    `,pluginMarketplaceCardHeader:n`
      flex: 1;
    `,pluginMarketplaceCardTitle:n`
      font-size: 0.95rem;
      font-weight: 600;
      color: ${r(e.gray[900],e.gray[100])};
      margin: 0 0 0.5rem 0;
      line-height: 1.4;
    `,pluginMarketplaceCardDescription:n`
      font-size: 0.8rem;
      color: ${r(e.gray[500],e.gray[500])};
      margin: 0;
      padding: 0;
      background: transparent;
      border-radius: 0.375rem;
      display: block;
      font-weight: 500;
    `,pluginMarketplaceCardPackageBadge:n`
      margin-top: 4px;
      margin-bottom: 8px;
      font-size: 0.6875rem;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      opacity: 0.6;
      padding: 4px 8px;
      padding-left: 0;
      background-color: var(--bg-tertiary);
      border-radius: 4px;
      word-break: break-all;
      display: inline-block;
    `,pluginMarketplaceCardDescriptionText:n`
      line-height: 1.5;
      margin-top: 0;
    `,pluginMarketplaceCardVersionInfo:n`
      margin-top: 8px;
      font-size: 0.6875rem;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    `,pluginMarketplaceCardVersionSatisfied:n`
      color: ${r(e.green[600],e.green[400])};
    `,pluginMarketplaceCardVersionUnsatisfied:n`
      color: ${r(e.red[600],e.red[400])};
    `,pluginMarketplaceCardDocsLink:n`
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      color: ${r(e.blue[600],e.blue[400])};
      text-decoration: none;
      margin-top: 0.5rem;
      transition: color 0.15s ease;

      &:hover {
        color: ${r(e.blue[700],e.blue[300])};
        text-decoration: underline;
      }

      svg {
        width: 12px;
        height: 12px;
      }
    `,pluginMarketplaceCardTags:n`
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
      margin-top: 0.75rem;
    `,pluginMarketplaceCardTag:n`
      font-size: 0.6875rem;
      font-weight: 500;
      padding: 0.25rem 0.5rem;
      background: ${r(e.gray[100],e.darkGray[700])};
      border: 1px solid ${r(e.gray[300],e.gray[600])};
      border-radius: 0.25rem;
      color: ${r(e.gray[700],e.gray[300])};
    `,pluginMarketplaceCardImage:n`
      width: 28px;
      height: 28px;
      object-fit: contain;
    `,pluginMarketplaceNewBanner:n`
      position: absolute;
      top: 12px;
      right: -35px;
      background-color: ${r(e.green[500],e.green[500])};
      color: white;
      padding: 4px 40px;
      font-size: 0.6875rem;
      font-weight: bold;
      text-transform: uppercase;
      transform: rotate(45deg);
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.5);
      z-index: 10;
      letter-spacing: 0.5px;
    `,pluginMarketplaceCardFeatured:n`
      border-color: ${r(e.blue[500],e.blue[400])};
      border-width: 2px;
    `,pluginMarketplaceCardActive:n`
      border-color: ${r(e.green[500],e.green[600])};
      border-width: 2px;

      &:hover {
        border-color: ${r(e.green[500],e.green[600])};
        box-shadow: none;
        transform: none;

        &::before {
          transform: scaleX(0);
        }
      }
    `,pluginMarketplaceCardStatus:n`
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: ${r(e.green[600],e.green[400])};
      animation: statusFadeIn 0.3s ease;

      @keyframes statusFadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      svg {
        width: 18px;
        height: 18px;
        animation: iconPop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes iconPop {
        0% {
          transform: scale(0);
        }
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }
    `,pluginMarketplaceCardSpinner:n`
      width: 18px;
      height: 18px;
      border: 2px solid ${r(e.gray[200],e.gray[700])};
      border-top-color: ${r(e.blue[600],e.blue[400])};
      border-radius: 50%;
      animation: spin 0.8s linear infinite;

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,pluginMarketplaceCardStatusText:n`
      font-size: 0.875rem;
      font-weight: 600;
    `,pluginMarketplaceCardStatusTextError:n`
      font-size: 0.875rem;
      font-weight: 600;
      color: ${r(e.red[600],e.red[400])};
    `,pluginMarketplaceEmpty:n`
      padding: 3rem 2rem;
      text-align: center;
      background: ${r(e.white,e.darkGray[800])};
      border: 2px dashed ${r(e.gray[300],e.gray[700])};
      border-radius: 0.75rem;
      animation: fadeIn 0.3s ease;
    `,pluginMarketplaceEmptyText:n`
      font-size: 0.95rem;
      color: ${r(e.gray[600],e.gray[400])};
      margin: 0;
      line-height: 1.6;
    `,pluginMarketplaceSection:n`
      margin-bottom: 2.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    `,pluginMarketplaceSectionHeader:n`
      margin-bottom: 1rem;
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      user-select: none;
      background: ${r(e.gray[50],e.darkGray[800])};
      border: 1px solid ${r(e.gray[200],e.gray[700])};
      border-radius: 0.5rem;
      transition: all 0.15s ease;

      &:hover {
        background: ${r(e.gray[100],e.darkGray[700])};
        border-color: ${r(e.gray[300],e.gray[600])};
      }
    `,pluginMarketplaceSectionHeaderLeft:n`
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `,pluginMarketplaceSectionChevron:n`
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${r(e.gray[700],e.gray[300])};
      transition: transform 0.2s ease;
    `,pluginMarketplaceSectionChevronCollapsed:n`
      transform: rotate(-90deg);
    `,pluginMarketplaceSectionTitle:n`
      font-size: 1.25rem;
      font-weight: 700;
      color: ${r(e.gray[900],e.gray[50])};
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `,pluginMarketplaceSectionBadge:n`
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
      background: ${r("linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)","linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)")};
      color: white;
      border-radius: 0.25rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    `,pluginMarketplaceFeatureBanner:n`
      margin-top: 1rem;
      padding: 1.25rem 1.5rem;
      background: ${r("linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)","linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)")};
      border-radius: 0.75rem;
      border: 1px solid ${r(e.blue[400],e.blue[800])};
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    `,pluginMarketplaceFeatureBannerContent:n`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    `,pluginMarketplaceFeatureBannerTitle:n`
      font-size: 1.125rem;
      font-weight: 700;
      color: white;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `,pluginMarketplaceFeatureBannerIcon:n`
      width: 24px;
      height: 24px;
      display: inline-flex;
    `,pluginMarketplaceFeatureBannerText:n`
      font-size: 0.95rem;
      color: ${r("rgba(255, 255, 255, 0.95)","rgba(255, 255, 255, 0.9)")};
      line-height: 1.5;
      margin: 0;
    `,pluginMarketplaceFeatureBannerButton:n`
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1.25rem;
      background: white;
      color: ${e.blue[600]};
      font-weight: 600;
      font-size: 0.95rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      align-self: flex-start;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &:hover {
        background: ${r(e.gray[50],e.gray[100])};
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      &:active {
        transform: translateY(0);
      }
    `,pluginMarketplaceFeatureBannerButtonIcon:n`
      width: 18px;
      height: 18px;
    `,pluginMarketplaceCardDisabled:n`
      opacity: 0.6;
      filter: grayscale(0.3);
      cursor: not-allowed;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    `,pluginMarketplaceCardBadge:n`
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.25rem 0.5rem;
      font-size: 0.65rem;
      font-weight: 600;
      text-transform: uppercase;
      border-radius: 0.25rem;
      letter-spacing: 0.05em;
    `,pluginMarketplaceCardBadgeInstall:n`
      background: ${r(e.green[100],e.green[900])};
      color: ${r(e.green[700],e.green[300])};
    `,pluginMarketplaceCardBadgeAdd:n`
      background: ${r(e.blue[100],e.blue[900])};
      color: ${r(e.blue[700],e.blue[300])};
    `,pluginMarketplaceCardBadgeRequires:n`
      background: ${r(e.gray[100],e.gray[800])};
      color: ${r(e.gray[600],e.gray[400])};
    `,pluginMarketplaceButtonInstalled:n`
      opacity: 0.5;
    `,pluginNameAddMore:n`
      font-size: ${o.xs};
      font-family: ${l.sans};
      color: ${r(e.gray[600],e.gray[400])};
      padding: ${i[3]} ${i[2]};
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
      border-left: 2px solid transparent;
      background: ${r("linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)","linear-gradient(135deg, #1f2937 0%, #111827 100%)")};
      font-weight: 600;
      position: relative;
      margin-top: auto;

      h3 {
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;

        &::before {
          content: '✨';
          font-size: 0.875rem;
          animation: sparkle 2s ease-in-out infinite;
        }
      }

      @keyframes sparkle {
        0%,
        100% {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        50% {
          opacity: 0.6;
          transform: scale(1.1) rotate(10deg);
        }
      }

      &:hover {
        background: ${r("linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)","linear-gradient(135deg, #374151 0%, #1f2937 100%)")};
        color: ${r(e.gray[900],e.gray[100])};
        border-left-color: ${r(e.blue[500],e.blue[400])};

        h3::before {
          animation: sparkle 0.5s ease-in-out infinite;
        }
      }

      &.active {
        background: ${r("linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)","linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)")};
        color: ${r(e.white,e.white)};
        border-left: 2px solid ${r(e.blue[600],e.blue[300])};
        box-shadow: 0 4px 12px
          ${r("rgba(59, 130, 246, 0.3)","rgba(96, 165, 250, 0.3)")};

        h3::before {
          filter: brightness(0) invert(1);
        }
      }

      &.active:hover {
        background: ${r("linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)","linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)")};
      }
    `}};function H(){const{theme:t}=Be(),[e,a]=T(Ve(t()));return L(()=>{a(Ve(t()))}),e}var en="data:image/png;base64,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",tn=m("<div>"),rn=m('<button type=button aria-label="Open TanStack Devtools">'),nn=m('<img alt="TanStack Devtools">'),an=t=>{const{settings:e}=ae(),[a,i]=T(),d=H(),l=D(()=>O(d().mainCloseBtn,d().mainCloseBtnPosition(e().position),d().mainCloseBtnAnimation(t.isOpen(),e().hideUntilHover)));return L(()=>{const o=e().customTrigger,n=a();o&&n&&o(n,{theme:e().theme})}),u(B,{get when(){return!e().triggerHidden},get children(){var o=rn();return o.$$click=()=>t.setIsOpen(!t.isOpen()),h(o,u(B,{get when(){return e().customTrigger},get fallback(){return(()=>{var n=nn();return Y(n,"src",en),n})()},get children(){var n=tn();return ie(i,n),n}})),y(()=>p(o,l())),o}})};G(["click"]);var on=m("<div>"),ln=t=>{const e=H(),{height:a}=mt(),{settings:i}=ae(),d=Se();return(()=>{var l=on();return Y(l,"id",$e),h(l,u(Wr,{animationMs:400,get children(){return t.children}})),y(o=>{var n=d().pipWindow?"100vh":a()+"px",r=d().pipWindow?"100vh":a()+"px",s=O(e().devtoolsPanelContainer(i().panelLocation,!!d().pipWindow),e().devtoolsPanelContainerAnimation(t.isOpen(),a(),i().panelLocation),e().devtoolsPanelContainerVisibility(t.isOpen()),e().devtoolsPanelContainerResizing(t.isResizing));return n!==o.e&&((o.e=n)!=null?l.style.setProperty("height",n):l.style.removeProperty("height")),r!==o.t&&((o.t=r)!=null?l.style.setProperty("--tsd-main-panel-height",r):l.style.removeProperty("--tsd-main-panel-height")),s!==o.a&&p(l,o.a=s),o},{e:void 0,t:void 0,a:void 0}),l})()},Ye=m("<div>"),sn=t=>{const e=H(),{settings:a}=ae();return(()=>{var i=Ye(),d=t.ref;return typeof d=="function"?ie(d,i):t.ref=i,h(i,(()=>{var l=R(()=>!!t.handleDragStart);return()=>l()?(()=>{var o=Ye();return be(o,"mousedown",t.handleDragStart,!0),y(()=>p(o,e().dragHandle(a().panelLocation))),o})():null})(),null),h(i,()=>t.children,null),y(()=>p(i,e().devtoolsPanel)),i})()};G(["mousedown"]);var cn=m("<div><h4></h4><div></div>Final shortcut is: "),dn={Shift:"Shift",Alt:"Alt",Meta:"Meta",Control:"Control",CtrlOrMeta:"Ctrl Or Meta"},Ge=t=>{const e=H(),a=o=>{if(t.hotkey.includes(o))t.onHotkeyChange(t.hotkey.filter(n=>n!==o));else{const n=t.hotkey.filter(s=>t.modifiers.includes(s)),r=t.hotkey.filter(s=>!t.modifiers.includes(s));t.onHotkeyChange([...n,o,...r])}},i=()=>t.hotkey.filter(o=>!t.modifiers.includes(o)).join("+"),d=o=>{const n=c=>{if(c.length===1)return[Le(c)];const g=[];for(const f of c){const C=Le(f);g.includes(C)||g.push(C)}return g},r=t.hotkey.filter(c=>t.modifiers.includes(c)),s=o.split("+").flatMap(c=>n(c)).filter(Boolean);t.onHotkeyChange([...r,...s])},l=()=>t.hotkey.join(" + ");return(()=>{var o=cn(),n=o.firstChild,r=n.nextSibling,s=r.nextSibling;return n.style.setProperty("margin","0"),h(n,()=>t.description),h(r,u(B,{keyed:!0,get when(){return t.hotkey},get children(){return t.modifiers.map(c=>u(gt,{variant:"success",onclick:()=>a(c),get outline(){return!t.hotkey.includes(c)},get children(){return dn[c]||c}}))}})),h(o,u(ct,{description:"Use '+' to combine keys (e.g., 'a+b' or 'd'). This will be used with the enabled modifiers from above",placeholder:"a",get value(){return i()},onChange:d}),s),h(o,l,null),y(c=>{var g=e().settingsGroup,f=e().settingsModifiers;return g!==c.e&&p(o,c.e=g),f!==c.t&&p(r,c.t=f),c},{e:void 0,t:void 0}),o})()},fe=m("<div>"),gn=m("<div><div>"),un=()=>{const{setSettings:t,settings:e}=ae(),a=H(),i=["CtrlOrMeta","Alt","Shift"];return u(ut,{withPadding:!0,get children(){return[u(se,{get children(){return[u(ce,{get children(){return[u(ge,{get children(){return u(Cr,{})}}),"General"]}}),u(de,{children:"Configure general behavior of the devtools panel."}),(()=>{var d=fe();return h(d,u(le,{label:"Default open",description:"Automatically open the devtools panel when the page loads",onChange:()=>t({defaultOpen:!e().defaultOpen}),get checked(){return e().defaultOpen}}),null),h(d,u(le,{label:"Hide trigger until hovered",description:"Keep the devtools trigger button hidden until you hover over its area",onChange:()=>t({hideUntilHover:!e().hideUntilHover}),get checked(){return e().hideUntilHover}}),null),h(d,u(le,{label:"Completely hide trigger",description:"Completely removes the trigger from the DOM (you can still open it with the hotkey)",onChange:()=>t({triggerHidden:!e().triggerHidden}),get checked(){return e().triggerHidden}}),null),h(d,u(we,{label:"Theme",description:"Choose the theme for the devtools panel",get value(){return e().theme},options:[{label:"Dark",value:"dark"},{label:"Light",value:"light"}],onChange:l=>t({theme:l})}),null),y(()=>p(d,a().settingsGroup)),d})()]}}),u(se,{get children(){return[u(ce,{get children(){return[u(ge,{get children(){return u($r,{})}}),"URL Configuration"]}}),u(de,{children:"Control when devtools are available based on URL parameters."}),(()=>{var d=fe();return h(d,u(le,{label:"Require URL Flag",description:"Only show devtools when a specific URL parameter is present",get checked(){return e().requireUrlFlag},onChange:l=>t({requireUrlFlag:l})}),null),h(d,u(B,{get when(){return e().requireUrlFlag},get children(){var l=fe();return h(l,u(ct,{label:"URL flag",description:"Enter the URL parameter name (e.g., 'debug' for ?debug=true)",placeholder:"debug",get value(){return e().urlFlag},onChange:o=>t({urlFlag:o})})),y(()=>p(l,a().conditionalSetting)),l}}),null),y(()=>p(d,a().settingsGroup)),d})()]}}),u(se,{get children(){return[u(ce,{get children(){return[u(ge,{get children(){return u(xr,{})}}),"Keyboard"]}}),u(de,{children:"Customize keyboard shortcuts for quick access."}),(()=>{var d=fe();return h(d,u(Ge,{title:"Open/Close Devtools",description:"Hotkey to open/close devtools",get hotkey(){return e().openHotkey},modifiers:i,onHotkeyChange:l=>t({openHotkey:l})}),null),h(d,u(Ge,{title:"Source Inspector",description:"Hotkey to open source inspector",get hotkey(){return e().inspectHotkey},modifiers:i,onHotkeyChange:l=>t({inspectHotkey:l})}),null),y(()=>p(d,a().settingsStack)),d})()]}}),u(se,{get children(){return[u(ce,{get children(){return[u(ge,{get children(){return u(Mr,{})}}),"Position"]}}),u(de,{children:"Adjust the position of the trigger button and devtools panel."}),(()=>{var d=gn(),l=d.firstChild;return h(l,u(we,{label:"Trigger Position",options:[{label:"Bottom Right",value:"bottom-right"},{label:"Bottom Left",value:"bottom-left"},{label:"Top Right",value:"top-right"},{label:"Top Left",value:"top-left"},{label:"Middle Right",value:"middle-right"},{label:"Middle Left",value:"middle-left"}],get value(){return e().position},onChange:o=>t({position:o})}),null),h(l,u(we,{label:"Panel Position",get value(){return e().panelLocation},options:[{label:"Top",value:"top"},{label:"Bottom",value:"bottom"}],onChange:o=>t({panelLocation:o})}),null),y(o=>{var n=a().settingsGroup,r=a().settingRow;return n!==o.e&&p(d,o.e=n),r!==o.t&&p(l,o.t=r),o},{e:void 0,t:void 0}),d})()]}})]}})},pn=t=>{if(t.status==="installing")return"Installing...";if(t.status==="success")return"Installed!";if(t.status==="error")return"Error";switch(t.actionType){case"install":return"Install";case"install-devtools":return"Install Devtools";case"add-to-devtools":return"Add to Devtools";case"requires-package":return`Requires ${t.requiredPackageName}`;case"wrong-framework":return"Different Framework";case"already-installed":return"Already Installed";case"bump-version":return"Bump Version";case"version-mismatch":return"Version Mismatch";default:return"Install"}},hn=t=>t.actionType==="requires-package"||t.actionType==="wrong-framework"||t.actionType==="version-mismatch"?"danger":t.actionType==="bump-version"?"warning":t.actionType==="already-installed"?"secondary":"primary",fn=(t,e)=>{const a=e(),i=a.pluginMarketplaceCardBadge;switch(t.actionType){case"install":case"install-devtools":return`${i} ${a.pluginMarketplaceCardBadgeInstall}`;case"add-to-devtools":return`${i} ${a.pluginMarketplaceCardBadgeAdd}`;case"already-installed":return`${i} ${a.pluginMarketplaceCardBadgeAdd}`;case"bump-version":return`${i} ${a.pluginMarketplaceCardBadgeRequires}`;case"version-mismatch":return`${i} ${a.pluginMarketplaceCardBadgeRequires}`;case"requires-package":case"wrong-framework":return`${i} ${a.pluginMarketplaceCardBadgeRequires}`;default:return i}},mn=t=>{switch(t.actionType){case"install":case"install-devtools":return"Available";case"add-to-devtools":return"Installed";case"already-installed":return"Active";case"version-mismatch":return"Incompatible";case"requires-package":return"Unavailable";case"wrong-framework":return"Other Framework";default:return""}},vn=m("<div>New"),bn=m("<img>"),yn=m("<span>✓ v<!> • Min v"),kn=m("<p>"),wn=m('<a target=_blank rel="noopener noreferrer">Documentation '),xe=m("<div>"),Cn=m("<div><span></span><div></div><div><h3></h3><p></p><p>"),xn=m("<span>⚠️ v<!> • Requires v<!>+"),We=m("<span>"),Mn=m("<span>Installing..."),Sn=m("<span>Installed!"),$n=t=>{const e=H(),{card:a}=t;return(()=>{var i=Cn(),d=i.firstChild,l=d.nextSibling,o=l.nextSibling,n=o.firstChild,r=n.nextSibling,s=r.nextSibling;return i.style.setProperty("position","relative"),h(i,u(B,{get when(){return a.metadata?.isNew},get children(){var c=vn();return y(()=>p(c,e().pluginMarketplaceNewBanner)),c}}),d),h(d,()=>mn(a)),h(l,u(B,{get when(){return a.metadata?.logoUrl},get fallback(){return u(Ar,{})},get children(){var c=bn();return y(g=>{var f=a.metadata?.logoUrl,C=a.metadata?.title||a.devtoolsPackage,b=e().pluginMarketplaceCardImage;return f!==g.e&&Y(c,"src",g.e=f),C!==g.t&&Y(c,"alt",g.t=C),b!==g.a&&p(c,g.a=b),g},{e:void 0,t:void 0,a:void 0}),c}})),h(n,()=>a.metadata?.title||a.devtoolsPackage),h(r,()=>a.devtoolsPackage),h(s,()=>a.actionType==="requires-package"?`Requires ${a.requiredPackageName}`:a.actionType==="wrong-framework"?"For different framework projects":a.actionType==="already-installed"?"Active in your devtools":a.actionType==="version-mismatch"?a.versionInfo?.reason||"Version incompatible":a.metadata?.description||`For ${a.requiredPackageName}`),h(o,u(B,{get when(){return a.versionInfo},get children(){var c=kn();return h(c,u(B,{get when(){return a.versionInfo?.satisfied},get fallback(){return(()=>{var g=xn(),f=g.firstChild,C=f.nextSibling,b=C.nextSibling,v=b.nextSibling;return v.nextSibling,h(g,()=>a.versionInfo?.current,C),h(g,()=>a.versionInfo?.required,v),y(()=>p(g,e().pluginMarketplaceCardVersionUnsatisfied)),g})()},get children(){var g=yn(),f=g.firstChild,C=f.nextSibling;return C.nextSibling,h(g,()=>a.versionInfo?.current,C),h(g,()=>a.versionInfo?.required,null),y(()=>p(g,e().pluginMarketplaceCardVersionSatisfied)),g}})),y(()=>p(c,e().pluginMarketplaceCardVersionInfo)),c}}),null),h(o,u(B,{get when(){return a.metadata?.docsUrl},get children(){var c=wn();return c.firstChild,h(c,u(Ir,{}),null),y(g=>{var f=a.metadata?.docsUrl,C=e().pluginMarketplaceCardDocsLink;return f!==g.e&&Y(c,"href",g.e=f),C!==g.t&&p(c,g.t=C),g},{e:void 0,t:void 0}),c}}),null),h(o,u(B,{get when(){return a.metadata?.tags&&a.metadata.tags.length>0},get children(){var c=xe();return h(c,u(_,{get each(){return a.metadata?.tags},children:g=>(()=>{var f=We();return h(f,g),y(()=>p(f,e().pluginMarketplaceCardTag)),f})()})),y(()=>p(c,e().pluginMarketplaceCardTags)),c}}),null),h(i,u(B,{get when(){return a.status==="idle"},get fallback(){return(()=>{var c=xe();return h(c,u(B,{get when(){return a.status==="installing"},get children(){return[(()=>{var g=xe();return y(()=>p(g,e().pluginMarketplaceCardSpinner)),g})(),(()=>{var g=Mn();return y(()=>p(g,e().pluginMarketplaceCardStatusText)),g})()]}}),null),h(c,u(B,{get when(){return a.status==="success"},get children(){return[u(Pr,{}),(()=>{var g=Sn();return y(()=>p(g,e().pluginMarketplaceCardStatusText)),g})()]}}),null),h(c,u(B,{get when(){return a.status==="error"},get children(){return[u(Tr,{}),(()=>{var g=We();return h(g,()=>a.error||"Failed to install"),y(()=>p(g,e().pluginMarketplaceCardStatusTextError)),g})()]}}),null),y(()=>p(c,e().pluginMarketplaceCardStatus)),c})()},get children(){return u(gt,{get variant(){return hn(a)},onClick:()=>t.onAction(a),get disabled(){return a.status!=="idle"||a.actionType==="requires-package"||a.actionType==="wrong-framework"||a.actionType==="already-installed"||a.actionType==="version-mismatch"},get class(){return R(()=>a.actionType==="already-installed")()?e().pluginMarketplaceButtonInstalled:""},get children(){return pn(a)}})}}),null),y(c=>{var g=e().pluginMarketplaceCard,f={[e().pluginMarketplaceCardDisabled]:!a.isCurrentFramework&&a.actionType!=="already-installed",[e().pluginMarketplaceCardFeatured]:!!a.metadata?.featured&&a.actionType!=="already-installed",[e().pluginMarketplaceCardActive]:a.actionType==="already-installed"},C=fn(a,e),b=e().pluginMarketplaceCardIcon,v=!!a.metadata?.logoUrl,w=e().pluginMarketplaceCardHeader,M=e().pluginMarketplaceCardTitle,E=e().pluginMarketplaceCardPackageBadge,Q=e().pluginMarketplaceCardDescriptionText;return g!==c.e&&p(i,c.e=g),c.t=Ee(i,f,c.t),C!==c.a&&p(d,c.a=C),b!==c.o&&p(l,c.o=b),v!==c.i&&l.classList.toggle("custom-logo",c.i=v),w!==c.n&&p(o,c.n=w),M!==c.s&&p(n,c.s=M),E!==c.h&&p(r,c.h=E),Q!==c.r&&p(s,c.r=Q),c},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0}),i})()},En=m('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=currentColor><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">'),An=m('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><rect x=2 y=4 width=20 height=16 rx=2></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7">'),Pn=m(`<div><div><h4><span></span>Want to be featured here?</h4><p>If you've built a plugin for TanStack Devtools and would like to showcase it in the featured section, we'd love to hear from you! Reach out to us to discuss partnership opportunities.</p><a href="mailto:partners+devtools@tanstack.com?subject=Featured%20Plugin%20Partnership%20Inquiry"><span></span>Contact Us`),Tn=m("<div>"),Bn=m("<div><div><div><div></div><h3>"),zn=()=>En(),In=()=>An(),Fn=t=>{const e=H();return(()=>{var a=Bn(),i=a.firstChild,d=i.firstChild,l=d.firstChild,o=l.nextSibling;return be(i,"click",t.onToggleCollapse,!0),h(l,u(Br,{})),h(o,()=>t.section.displayName),h(a,u(B,{get when(){return!t.isCollapsed()},get children(){return[u(B,{get when(){return t.section.id==="featured"},get children(){var n=Pn(),r=n.firstChild,s=r.firstChild,c=s.firstChild,g=s.nextSibling,f=g.nextSibling,C=f.firstChild;return h(c,u(zn,{})),h(C,u(In,{})),y(b=>{var v=e().pluginMarketplaceFeatureBanner,w=e().pluginMarketplaceFeatureBannerContent,M=e().pluginMarketplaceFeatureBannerTitle,E=e().pluginMarketplaceFeatureBannerIcon,Q=e().pluginMarketplaceFeatureBannerText,Z=e().pluginMarketplaceFeatureBannerButton,A=e().pluginMarketplaceFeatureBannerButtonIcon;return v!==b.e&&p(n,b.e=v),w!==b.t&&p(r,b.t=w),M!==b.a&&p(s,b.a=M),E!==b.o&&p(c,b.o=E),Q!==b.i&&p(g,b.i=Q),Z!==b.n&&p(f,b.n=Z),A!==b.s&&p(C,b.s=A),b},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),n}}),(()=>{var n=Tn();return h(n,u(_,{get each(){return t.section.cards},children:r=>u($n,{card:r,get onAction(){return t.onCardAction}})})),y(()=>p(n,e().pluginMarketplaceGrid)),n})()]}}),null),y(n=>{var r=e().pluginMarketplaceSection,s=e().pluginMarketplaceSectionHeader,c=e().pluginMarketplaceSectionHeaderLeft,g=e().pluginMarketplaceSectionChevron,f={[e().pluginMarketplaceSectionChevronCollapsed]:t.isCollapsed()},C=e().pluginMarketplaceSectionTitle;return r!==n.e&&p(a,n.e=r),s!==n.t&&p(i,n.t=s),c!==n.a&&p(d,n.a=c),g!==n.o&&p(l,n.o=g),n.i=Ee(l,f,n.i),C!==n.n&&p(o,n.n=C),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),a})()};G(["click"]);var Ln=m("<div><div><h3>Marketplace Settings</h3><button></button></div><div>"),Dn=t=>{const e=H();return u(B,{get when(){return t.isOpen()},get children(){var a=Ln(),i=a.firstChild,d=i.firstChild,l=d.nextSibling,o=i.nextSibling;return be(l,"click",t.onClose,!0),h(l,u(Lr,{})),h(o,u(le,{label:"Show active plugins",description:"Display installed plugins in a separate section",get checked(){return t.showActivePlugins()},onChange:n=>t.setShowActivePlugins(n)})),y(n=>{var r=e().pluginMarketplaceSettingsPanel,s=e().pluginMarketplaceSettingsPanelHeader,c=e().pluginMarketplaceSettingsPanelTitle,g=e().pluginMarketplaceSettingsPanelClose,f=e().pluginMarketplaceSettingsPanelContent;return r!==n.e&&p(a,n.e=r),s!==n.t&&p(i,n.t=s),c!==n.a&&p(d,n.a=c),g!==n.o&&p(l,n.o=g),f!==n.i&&p(o,n.i=f),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),a}})};G(["click"]);var Hn=m("<div>"),Nn=m("<button>"),Un=t=>{const e=H();return u(B,{get when(){return t.tags().length>0},get children(){var a=Hn();return h(a,u(_,{get each(){return t.tags()},children:i=>(()=>{var d=Nn();return d.$$click=()=>t.onToggleTag(i),h(d,i),y(l=>{var o=e().pluginMarketplaceTagButton,n={[e().pluginMarketplaceTagButtonActive]:t.selectedTags().has(i)};return o!==l.e&&p(d,l.e=o),l.t=Ee(d,n,l.t),l},{e:void 0,t:void 0}),d})()})),y(()=>p(a,e().pluginMarketplaceTagsContainer)),a}})};G(["click"]);var On=m('<div><div><h2>Plugin Marketplace</h2><div><div><input type=text placeholder="Search plugins..."></div><button></button></div></div><p>Discover and install devtools for TanStack Query, Router, Form, and Pacer'),Qn=t=>{const e=H();return(()=>{var a=On(),i=a.firstChild,d=i.firstChild,l=d.nextSibling,o=l.firstChild,n=o.firstChild,r=o.nextSibling,s=i.nextSibling;return l.style.setProperty("display","flex"),l.style.setProperty("align-items","center"),h(o,u(zr,{}),n),n.$$input=c=>t.onSearchInput(c.currentTarget.value),be(r,"click",t.onSettingsClick,!0),h(r,u(Fr,{})),h(a,u(Un,{get tags(){return t.tags},get selectedTags(){return t.selectedTags},get onToggleTag(){return t.onToggleTag}}),null),y(c=>{var g=e().pluginMarketplaceHeader,f=e().pluginMarketplaceTitleRow,C=e().pluginMarketplaceTitle,b=e().pluginMarketplaceSearchWrapper,v=e().pluginMarketplaceSearch,w=e().pluginMarketplaceSettingsButton,M=e().pluginMarketplaceDescription;return g!==c.e&&p(a,c.e=g),f!==c.t&&p(i,c.t=f),C!==c.a&&p(d,c.a=C),b!==c.o&&p(o,c.o=b),v!==c.i&&p(n,c.i=v),w!==c.n&&p(r,c.n=w),M!==c.s&&p(s,c.s=M),c},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),y(()=>n.value=t.searchInput()),a})()};G(["input","click"]);var Ke=["react","solid","vue","svelte","angular"],qn={"@tanstack/react-query-devtools":{packageName:"@tanstack/react-query-devtools",title:"TanStack Query Devtools",description:"Powerful devtools for TanStack Query - inspect queries, mutations, and cache",requires:{packageName:"@tanstack/react-query",minVersion:"5.0.0"},pluginId:"tanstack-query",docsUrl:"https://tanstack.com/query/latest/docs/devtools",author:"TanStack",framework:"react",featured:!0,tags:["TanStack","data-fetching","caching","state-management"]},"@tanstack/solid-query-devtools":{packageName:"@tanstack/solid-query-devtools",title:"TanStack Query Devtools",description:"Powerful devtools for TanStack Query - inspect queries, mutations, and cache",requires:{packageName:"@tanstack/solid-query",minVersion:"5.0.0"},pluginId:"tanstack-query",docsUrl:"https://tanstack.com/query/latest/docs/devtools",author:"TanStack",framework:"solid",tags:["TanStack","data-fetching","caching","state-management"]},"@tanstack/react-router-devtools":{packageName:"@tanstack/react-router-devtools",title:"TanStack Router Devtools",description:"Inspect routes, navigation, and router state in real-time",requires:{packageName:"@tanstack/react-router",minVersion:"1.0.0"},pluginId:"tanstack-router",docsUrl:"https://tanstack.com/router/latest/docs/devtools",author:"TanStack",framework:"react",featured:!0,tags:["TanStack","routing","navigation"]},"@tanstack/solid-router-devtools":{packageName:"@tanstack/solid-router-devtools",title:"TanStack Router Devtools",description:"Inspect routes, navigation, and router state in real-time",requires:{packageName:"@tanstack/solid-router",minVersion:"1.0.0"},pluginId:"tanstack-router",docsUrl:"https://tanstack.com/router/latest/docs/devtools",author:"TanStack",framework:"solid",tags:["TanStack","routing","navigation"]},"@tanstack/react-form-devtools":{packageName:"@tanstack/react-form-devtools",title:"TanStack Form Devtools",description:"Debug form state, validation, and field values",requires:{packageName:"@tanstack/react-form",minVersion:"1.23.0"},pluginImport:{importName:"FormDevtoolsPlugin",type:"function"},pluginId:"tanstack-form",docsUrl:"https://tanstack.com/form/latest/docs/devtools",author:"TanStack",framework:"react",isNew:!0,tags:["TanStack","forms","validation"]},"@tanstack/solid-form-devtools":{packageName:"@tanstack/solid-form-devtools",title:"TanStack Form Devtools",description:"Debug form state, validation, and field values",requires:{packageName:"@tanstack/solid-form",minVersion:"1.23.0"},pluginImport:{importName:"FormDevtoolsPlugin",type:"function"},pluginId:"tanstack-form",docsUrl:"https://tanstack.com/form/latest/docs/devtools",author:"TanStack",isNew:!0,framework:"solid",tags:["TanStack","forms","validation"]},"@tanstack/react-pacer-devtools":{packageName:"@tanstack/react-pacer-devtools",title:"Pacer Devtools",description:"Monitor and debug your Pacer animations and transitions",requires:{packageName:"@tanstack/react-pacer",minVersion:"0.16.4"},author:"TanStack",framework:"react",isNew:!0,tags:["TanStack"]},"@tanstack/solid-pacer-devtools":{packageName:"@tanstack/solid-pacer-devtools",title:"Pacer Devtools",description:"Monitor and debug your Pacer animations and transitions",requires:{packageName:"@tanstack/solid-pacer",minVersion:"0.14.4"},author:"TanStack",framework:"solid",isNew:!0,tags:["TanStack"]},"@dimano/ts-devtools-plugin-prefetch-heatmap":{packageName:"@dimano/ts-devtools-plugin-prefetch-heatmap",title:"Prefetch Heatmap",description:"Visualize TanStack Router prefetch intent, hits, and waste with a color overlay and a live metrics panel.",requires:{packageName:"@tanstack/react-router",minVersion:"1.0.0"},pluginImport:{importName:"registerPrefetchHeatmapPlugin",type:"function"},pluginId:"prefetch-heatmap",logoUrl:"https://raw.githubusercontent.com/dimitrianoudi/tanstack-prefetch-heatmap/main/assets/prefetch-heatmap-card.png",docsUrl:"https://github.com/dimitrianoudi/tanstack-prefetch-heatmap#prefetch-heatmap-devtools-plugin",repoUrl:"https://github.com/dimitrianoudi/tanstack-prefetch-heatmap",author:"Dimitris Anoudis (@dimitrianoudi)",framework:"react",isNew:!0,tags:["Router","Prefetch","Analytics","Overlay","TanStack"]}};function Rn(){return Object.values(qn)}function ve(t){if(!t)return null;const e=t.replace(/^[v^~]/,"").split("-")[0]?.split("+")[0];if(!e)return null;const a=e.split(".");if(a.length<2)return null;const i=parseInt(a[0]??"0",10),d=parseInt(a[1]??"0",10),l=parseInt(a[2]??"0",10);return isNaN(i)||isNaN(d)||isNaN(l)?null:{major:i,minor:d,patch:l,raw:t}}function yt(t,e){return t.major!==e.major?t.major-e.major:t.minor!==e.minor?t.minor-e.minor:t.patch-e.patch}function jn(t,e){const a=ve(t),i=ve(e);return!a||!i?!0:yt(a,i)>=0}function Vn(t,e){const a=ve(t),i=ve(e);return!a||!i?!0:yt(a,i)<=0}function Yn(t,e,a){return!e&&!a?{satisfied:!0}:e&&!jn(t,e)?{satisfied:!1,reason:`Requires v${e} or higher (current: v${t})`}:a&&!Vn(t,a)?{satisfied:!1,reason:`Requires v${a} or lower (current: v${t})`}:{satisfied:!0}}var Ze=(t,e)=>{const a={...t.dependencies,...t.devDependencies},i={react:["react","react-dom"],vue:["vue","@vue/core"],solid:["solid-js"],svelte:["svelte"],angular:["@angular/core"]};for(const d of e){const l=i[d];if(l&&l.some(o=>a[o]))return d}return"unknown"},Gn=(t,e,a,i,d)=>{if(d)return Array.from(t).some(n=>{const r=n.toLowerCase(),s=d.toLowerCase();return r.startsWith(s)||r.includes(s)});if(t.has(e))return!0;const l=a.toLowerCase().split(/[-_/@]/).filter(n=>n.length>0),o=i.toLowerCase();return Array.from(t).some(n=>{const r=n.toLowerCase();if(r.includes(a.toLowerCase()))return!0;const s=l.filter(c=>r.includes(c));return!!(s.length>=2||r.includes(o)&&s.length>=1)})},Je=(t,e,a,i)=>{const d={...t.dependencies,...t.devDependencies},l=[];return Rn().forEach(n=>{const r=n.packageName,s=n.framework===e||n.framework==="other",c=n.requires?.packageName,g=c?!!d[c]:!1,f=!!d[r];let C;if(g&&n.requires){const M=c?d[c]:void 0;if(M){const E=Yn(M,n.requires.minVersion,n.requires.maxVersion);C={current:M,required:n.requires.minVersion,satisfied:E.satisfied,reason:E.reason}}}const b=Gn(a,r,n.packageName,n.framework,n.pluginId);let v;s?n.requires&&!g?v="requires-package":C&&!C.satisfied?v="bump-version":f&&b?v="already-installed":f&&!b?v="add-to-devtools":!f&&n.requires&&g?v="install-devtools":v="install":v="wrong-framework";const w=i.find(M=>M.devtoolsPackage===r);l.push({requiredPackageName:c||"",devtoolsPackage:r,framework:n.framework,hasPackage:g,hasDevtools:f,isRegistered:b,actionType:v,status:w?.status||"idle",error:w?.error,isCurrentFramework:s,metadata:n,versionInfo:C})}),l},Xe=t=>{const e=[],a=t.filter(l=>l.metadata?.featured&&l.actionType!=="already-installed"&&l.isCurrentFramework);e.push({id:"featured",displayName:"⭐ Featured",cards:a});const i=t.filter(l=>l.actionType==="already-installed"&&l.isRegistered);i.length>0&&e.push({id:"active",displayName:"✓ Active Plugins",cards:i});const d=t.filter(l=>l.isCurrentFramework&&l.actionType!=="already-installed"&&!l.metadata?.featured);return d.length>0&&e.push({id:"available",displayName:"Available Plugins",cards:d}),e},Wn=m("<div><p>"),Kn=m("<div>"),_e=()=>{const t=H(),{plugins:e}=ft(),[a,i]=T([]),[d,l]=T(null),[o,n]=T(""),[r,s]=T(""),[c,g]=T(new Set),[f,C]=T(!0),[b,v]=T(new Set),[w,M]=T(!1);let E;const Q=k=>{n(k),E&&clearTimeout(E),E=setTimeout(()=>{s(k)},300)},Z=k=>{g(P=>{const $=new Set(P);return $.has(k)?$.delete(k):$.add(k),$})},A=(k,P)=>{if(!P)return!0;const $=P.toLowerCase();return k.devtoolsPackage.toLowerCase().includes($)||k.requiredPackageName.toLowerCase().includes($)||k.framework.toLowerCase().includes($)},F=()=>{const k=r(),P=f(),$=b(),z=d();if(!z)return[];const I=Ze(z,Ke),N=new Set(e()?.map(U=>U.id||"")||[]),re=Je(z,I,N,a().flatMap(U=>U.cards));let q=Xe(re);return P||(q=q.filter(U=>U.id!=="active")),$.size>0&&(q=q.map(U=>({...U,cards:U.cards.filter(he=>he.metadata?.tags?he.metadata.tags.some(wt=>$.has(wt)):!1)})).filter(U=>U.cards.length>0)),k?q.map(U=>({...U,cards:U.cards.filter(he=>A(he,k))})).filter(U=>U.cards.length>0):q};at(()=>{const k=K.on("package-json-read",I=>{l(I.payload.packageJson),W(I.payload.packageJson)}),P=K.on("package-json-updated",I=>{l(I.payload.packageJson),W(I.payload.packageJson)}),$=K.on("devtools-installed",I=>{i(N=>N.map(re=>({...re,cards:re.cards.map(q=>q.devtoolsPackage===I.payload.packageName?{...q,status:I.payload.success?"success":"error",error:I.payload.error}:q)})))}),z=K.on("plugin-added",I=>{if(i(N=>N.map(re=>({...re,cards:re.cards.map(q=>q.devtoolsPackage===I.payload.packageName?{...q,status:I.payload.success?"success":"error",error:I.payload.error}:q)}))),I.payload.success){const N=d();N&&W(N)}});X(()=>{k(),P(),$(),z()}),K.emit("mounted",void 0)});const W=k=>{if(!k)return;const P=Ze(k,Ke),$=new Set(e()?.map(N=>N.id||"")||[]),z=Je(k,P,$,a().flatMap(N=>N.cards)),I=Xe(z);i(I)},j=k=>{if(!(k.actionType==="requires-package"||k.actionType==="wrong-framework"||k.actionType==="already-installed"||k.actionType==="version-mismatch")){if(i(P=>P.map($=>({...$,cards:$.cards.map(z=>z.devtoolsPackage===k.devtoolsPackage?{...z,status:"installing"}:z)}))),k.actionType==="bump-version"){K.emit("bump-package-version",{packageName:k.requiredPackageName,devtoolsPackage:k.devtoolsPackage,pluginName:k.metadata?.title||k.devtoolsPackage,minVersion:k.metadata?.requires?.minVersion,pluginImport:k.metadata?.pluginImport});return}if(k.actionType==="add-to-devtools"){K.emit("add-plugin-to-devtools",{packageName:k.devtoolsPackage,pluginName:k.metadata?.title??k.devtoolsPackage,pluginImport:k.metadata?.pluginImport});return}K.emit("install-devtools",{packageName:k.devtoolsPackage,pluginName:k.metadata?.title??k.devtoolsPackage,pluginImport:k.metadata?.pluginImport})}},V=()=>{const k=new Set;return a().forEach(P=>{(P.id==="featured"||P.id==="available")&&P.cards.forEach($=>{$.metadata?.tags&&$.metadata.tags.forEach(z=>k.add(z))})}),Array.from(k).sort()},te=k=>{v(P=>{const $=new Set(P);return $.has(k)?$.delete(k):$.add(k),$})};return(()=>{var k=Kn();return h(k,u(Dn,{isOpen:w,onClose:()=>M(!1),showActivePlugins:f,setShowActivePlugins:C}),null),h(k,u(Qn,{searchInput:o,onSearchInput:Q,onSettingsClick:()=>M(!w()),tags:V,selectedTags:b,onToggleTag:te}),null),h(k,u(B,{get when(){return F().length>0},get children(){return u(_,{get each(){return F()},children:P=>u(Fn,{section:P,isCollapsed:()=>c().has(P.id),onToggleCollapse:()=>Z(P.id),onCardAction:j})})}}),null),h(k,u(B,{get when(){return F().length===0},get children(){var P=Wn(),$=P.firstChild;return h($,(()=>{var z=R(()=>!!r());return()=>z()?`No plugins found matching "${r()}"`:"No additional plugins available. You have all compatible devtools installed and registered!"})()),y(z=>{var I=t().pluginMarketplaceEmpty,N=t().pluginMarketplaceEmptyText;return I!==z.e&&p(P,z.e=I),N!==z.t&&p($,z.t=N),z},{e:void 0,t:void 0}),P}}),null),y(()=>p(k,t().pluginMarketplace)),k})()},Zn=m("<div><div><div><div></div><div><h3>Add More"),Jn=m("<div><h3>"),Xn=m("<div>"),_n=()=>{const{plugins:t,activePlugins:e,toggleActivePlugins:a}=ft(),{expanded:i,hoverUtils:d,animationMs:l,setForceExpand:o}=Pe(),[n,r]=T(new Map),[s,c]=T(!1),g=H(),{theme:f}=Be(),C=D(()=>t()?.length&&t().length>0);L(()=>{o(s())}),L(()=>{t()?.filter(M=>e().includes(M.id))?.forEach(M=>{const E=n().get(M.id);E&&M.render(E,f())})});const b=()=>c(!s()),v=w=>{s()&&c(!1),a(w)};return u(B,{get when(){return C()},get fallback(){return u(_e,{})},get children(){var w=Zn(),M=w.firstChild,E=M.firstChild,Q=E.firstChild,Z=Q.nextSibling;return M.addEventListener("mouseleave",()=>{s()||d.leave()}),M.addEventListener("mouseenter",()=>d.enter()),h(Q,u(_,{get each(){return t()},children:A=>{let F;L(()=>{F&&(typeof A.name=="string"?F.textContent=A.name:A.name(F,f()))});const W=D(()=>e().includes(A.id));return(()=>{var j=Jn(),V=j.firstChild;j.$$click=()=>v(A.id);var te=F;return typeof te=="function"?ie(te,V):F=V,y(k=>{var P=O(g().pluginName,{active:W()}),$=`${zt}-${A.id}`;return P!==k.e&&p(j,k.e=P),$!==k.t&&Y(V,"id",k.t=$),k},{e:void 0,t:void 0}),j})()}})),Z.$$click=b,h(w,u(B,{get when(){return s()},get fallback(){return u(_,{get each(){return e()},children:A=>(()=>{var F=Xn();return ie(W=>{r(j=>{const V=new Map(j);return V.set(A,W),V})},F),Y(F,"id",`${It}-${A}`),y(()=>p(F,g().pluginsTabContent)),F})()})},get children(){return u(_e,{})}}),null),y(A=>{var F=g().pluginsTabPanel,W=O(g().pluginsTabDraw(i()),{[g().pluginsTabDraw(i())]:i()},g().pluginsTabDrawTransition(l)),j=O(g().pluginsTabSidebar(i()),g().pluginsTabSidebarTransition(l)),V=g().pluginsList,te=O(g().pluginNameAddMore,{active:s()});return F!==A.e&&p(w,A.e=F),W!==A.t&&p(M,A.t=W),j!==A.a&&p(E,A.a=j),V!==A.o&&p(Q,A.o=V),te!==A.i&&p(Z,A.i=te),A},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),w}})};G(["click"]);function ea(t,e={}){const{attributes:a=!0,childList:i=!0,subtree:d=!0,observeTitle:l=!0}=e;at(()=>{const o=new MutationObserver(r=>{for(const s of r)if(s.type==="childList")s.addedNodes.forEach(c=>t({kind:"added",node:c},s)),s.removedNodes.forEach(c=>t({kind:"removed",node:c},s));else if(s.type==="attributes"){const c=s.target;t({kind:"attr",target:c,name:s.attributeName,oldValue:s.oldValue??null},s)}else s.target.parentNode&&s.target.parentNode.tagName.toLowerCase()==="title"&&t({kind:"title",title:document.title},s)});o.observe(document.head,{childList:i,attributes:a,subtree:d,attributeOldValue:a,characterData:!0,characterDataOldValue:!1});let n;if(l){const r=document.head.querySelector("title")||document.head.appendChild(document.createElement("title"));n=new MutationObserver(()=>{t({kind:"title",title:document.title})}),n.observe(r,{childList:!0,characterData:!0,subtree:!0})}X(()=>{o.disconnect(),n?.disconnect()})})}var ta=m("<div><div> Preview</div><div></div><div></div><div>"),ra=m("<img alt=Preview>"),na=m("<div>No Image"),et=m("<div>"),aa=m("<div><strong>Missing tags for <!>:</strong><ul>"),oa=m("<li>"),tt=[{network:"Facebook",tags:[{key:"og:title",prop:"title"},{key:"og:description",prop:"description"},{key:"og:image",prop:"image"},{key:"og:url",prop:"url"}],color:"#4267B2"},{network:"X/Twitter",tags:[{key:"twitter:title",prop:"title"},{key:"twitter:description",prop:"description"},{key:"twitter:image",prop:"image"},{key:"twitter:url",prop:"url"}],color:"#1DA1F2"},{network:"LinkedIn",tags:[{key:"og:title",prop:"title"},{key:"og:description",prop:"description"},{key:"og:image",prop:"image"},{key:"og:url",prop:"url"}],color:"#0077B5"},{network:"Discord",tags:[{key:"og:title",prop:"title"},{key:"og:description",prop:"description"},{key:"og:image",prop:"image"},{key:"og:url",prop:"url"}],color:"#5865F2"},{network:"Slack",tags:[{key:"og:title",prop:"title"},{key:"og:description",prop:"description"},{key:"og:image",prop:"image"},{key:"og:url",prop:"url"}],color:"#4A154B"},{network:"Mastodon",tags:[{key:"og:title",prop:"title"},{key:"og:description",prop:"description"},{key:"og:image",prop:"image"},{key:"og:url",prop:"url"}],color:"#6364FF"},{network:"Bluesky",tags:[{key:"og:title",prop:"title"},{key:"og:description",prop:"description"},{key:"og:image",prop:"image"},{key:"og:url",prop:"url"}],color:"#1185FE"}];function ia(t){const e=H();return(()=>{var a=ta(),i=a.firstChild,d=i.firstChild,l=i.nextSibling,o=l.nextSibling,n=o.nextSibling;return h(i,()=>t.network,d),h(a,(()=>{var r=R(()=>!!t.meta.image);return()=>r()?(()=>{var s=ra();return y(c=>{var g=t.meta.image,f=e().seoPreviewImage;return g!==c.e&&Y(s,"src",c.e=g),f!==c.t&&p(s,c.t=f),c},{e:void 0,t:void 0}),s})():(()=>{var s=na();return s.style.setProperty("background","#222"),s.style.setProperty("color","#888"),s.style.setProperty("display","flex"),s.style.setProperty("align-items","center"),s.style.setProperty("justify-content","center"),s.style.setProperty("min-height","80px"),s.style.setProperty("width","100%"),y(()=>p(s,e().seoPreviewImage)),s})()})(),l),h(l,()=>t.meta.title||"No Title"),h(o,()=>t.meta.description||"No Description"),h(n,()=>t.meta.url||window.location.href),y(r=>{var s=e().seoPreviewCard,c=t.color,g=e().seoPreviewHeader,f=t.color,C=e().seoPreviewTitle,b=e().seoPreviewDesc,v=e().seoPreviewUrl;return s!==r.e&&p(a,r.e=s),c!==r.t&&((r.t=c)!=null?a.style.setProperty("border-color",c):a.style.removeProperty("border-color")),g!==r.a&&p(i,r.a=g),f!==r.o&&((r.o=f)!=null?i.style.setProperty("color",f):i.style.removeProperty("color")),C!==r.i&&p(l,r.i=C),b!==r.n&&p(o,r.n=b),v!==r.s&&p(n,r.s=v),r},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),a})()}var la=()=>{const[t,e]=T(i()),a=H();function i(){const d=Array.from(document.head.querySelectorAll("meta")),l=[];for(const o of tt){const n={},r=[];for(const s of o.tags){const c=d.find(g=>(s.key.includes("twitter:")?!1:g.getAttribute("property")===s.key)||g.getAttribute("name")===s.key);c&&c.getAttribute("content")?n[s.prop]=c.getAttribute("content")||void 0:r.push(s.key)}l.push({network:o.network,found:n,missing:r})}return l}return ea(()=>{e(i())}),u(ut,{withPadding:!0,get children(){return u(se,{get children(){return[u(ce,{get children(){return[u(ge,{get children(){return u(Sr,{})}}),"Social previews"]}}),u(de,{children:"See how your current page will look when shared on popular social networks. The tool checks for essential meta tags and highlights any that are missing."}),(()=>{var d=et();return h(d,u(_,{get each(){return t()},children:(l,o)=>{const n=tt[o()];return(()=>{var r=et();return h(r,u(ia,{get meta(){return l.found},get color(){return n.color},get network(){return n.network}}),null),h(r,(()=>{var s=R(()=>l.missing.length>0);return()=>s()?(()=>{var c=aa(),g=c.firstChild,f=g.firstChild,C=f.nextSibling;C.nextSibling;var b=g.nextSibling;return h(g,()=>n?.network,C),h(b,u(_,{get each(){return l.missing},children:v=>(()=>{var w=oa();return h(w,v),y(()=>p(w,a().seoMissingTag)),w})()})),y(v=>{var w=a().seoMissingTagsSection,M=a().seoMissingTagsList;return w!==v.e&&p(c,v.e=w),M!==v.t&&p(b,v.t=M),v},{e:void 0,t:void 0}),c})():null})(),null),r})()}})),y(()=>p(d,a().seoPreviewSection)),d})()]}})}})},kt=[{name:"Plugins",id:"plugins",component:()=>u(_n,{}),icon:()=>u(yr,{})},{name:"SEO",id:"seo",component:()=>u(la,{}),icon:()=>u(kr,{})},{name:"Settings",id:"settings",component:()=>u(un,{}),icon:()=>u(wr,{})}],sa=m("<div>"),ca=m("<button type=button>"),da=m("<div><button type=button></button><button type=button>"),ga=t=>{const e=H(),{state:a,setState:i}=ke(),d=Se(),l=()=>{d().requestPipWindow(`width=${window.innerWidth},height=${a().height},top=${window.screen.height},left=${window.screenLeft}}`)},{hoverUtils:o}=Pe();return(()=>{var n=sa();return h(n,u(_,{each:kt,children:r=>(()=>{var s=ca();return s.addEventListener("mouseleave",()=>{r.id==="plugins"&&o.leave()}),s.addEventListener("mouseenter",()=>{r.id==="plugins"&&o.enter()}),s.$$click=()=>i({activeTab:r.id}),h(s,()=>r.icon()),y(()=>p(s,O(e().tab,{active:a().activeTab===r.id}))),s})()}),null),h(n,(()=>{var r=R(()=>d().pipWindow!==null);return()=>r()?null:(()=>{var s=da(),c=s.firstChild,g=c.nextSibling;return s.style.setProperty("margin-top","auto"),c.$$click=l,h(c,u(Dr,{})),g.$$click=()=>t.toggleOpen(),h(g,u(Er,{})),y(f=>{var C=O(e().tab,"detach"),b=O(e().tab,"close");return C!==f.e&&p(c,f.e=C),b!==f.t&&p(g,f.t=b),f},{e:void 0,t:void 0}),s})()})(),null),y(()=>p(n,e().tabContainer)),n})()};G(["click"]);var ua=m("<div>"),pa=()=>{const{state:t}=ke(),e=H(),a=D(()=>kt.find(i=>i.id===t().activeTab)?.component||null);return(()=>{var i=ua();return h(i,()=>a()?.()),y(()=>p(i,e().tabContent)),i})()},rt=m("<div>"),ha=()=>{const{settings:t}=ae(),e=()=>({element:null,bounding:{width:0,height:0,left:0,top:0},dataSource:""}),[a,i]=ze(e()),d=()=>{i(e())},[l,o]=T(null),n=Yr(()=>l()),[r,s]=ze({x:0,y:0});Ue(document,"mousemove",b=>{s({x:b.clientX,y:b.clientY})});const c=it(),g=D(()=>Xr(c(),t().inspectHotkey));L(()=>{if(!g()){d();return}const b=document.elementFromPoint(r.x,r.y);if(!(b instanceof HTMLElement)){d();return}if(b===a.element)return;const v=b.getAttribute("data-tsd-source");if(!v){d();return}const w=b.getBoundingClientRect(),M={width:w.width,height:w.height,left:w.left,top:w.top};i({element:b,bounding:M,dataSource:v})}),Ue(document,"click",b=>{if(!a.element)return;window.getSelection()?.removeAllRanges(),b.preventDefault(),b.stopPropagation();const v=new URL("/",location.origin),w=new URL(`__tsd/open-source?source=${encodeURIComponent(a.dataSource)}`,v);fetch(w).catch(()=>{})});const f=D(()=>a.element?{display:"block",width:`${a.bounding.width}px`,height:`${a.bounding.height}px`,left:`${a.bounding.left}px`,top:`${a.bounding.top}px`,"background-color":"oklch(55.4% 0.046 257.417 /0.25)",transition:"all 0.05s linear",position:"fixed","z-index":9999}:{display:"none"}),C=D(()=>{if(a.element&&l()){const b=window.innerWidth,v=n.height||26,w=n.width||0;let M=a.bounding.left,E=a.bounding.top-v-4;return E<0&&(E=a.bounding.top+a.bounding.height+4),M+w>b&&(M=b-w-4),M<0&&(M=4),{position:"fixed",left:`${M}px`,top:`${E}px`,"background-color":"oklch(55.4% 0.046 257.417 /0.80)",color:"white",padding:"2px 4px",fontSize:"12px","border-radius":"2px","z-index":1e4,visibility:"visible",transition:"all 0.05s linear"}}return{display:"none"}});return[(()=>{var b=rt();return ie(o,b),h(b,()=>a.dataSource),y(v=>Ie(b,{...C(),"pointer-events":"none"},v)),b})(),(()=>{var b=rt();return y(v=>Ie(b,{...f(),"pointer-events":"none"},v)),b})()]},fa=m("<div>");function ba(){const{settings:t}=ae(),{setHeight:e}=mt(),{persistOpen:a,setPersistOpen:i}=Kr(),[d,l]=T(),[o,n]=T(t().defaultOpen||a()),r=Se();let s;const[c,g]=T(!1),f=()=>{if(r().pipWindow)return;const w=!o();n(w),i(w),K.emit("trigger-toggled",{isOpen:w})};L(()=>{const v=K.on("trigger-toggled",w=>{if(r().pipWindow)return;const E=w.payload.isOpen;E!==o()&&(n(E),i(E))});X(v)});const C=(v,w)=>{if(w.button!==0||!v)return;g(!0);const M={originalHeight:v.getBoundingClientRect().height,pageY:w.pageY},E=Z=>{const A=M.pageY-Z.pageY,F=t().panelLocation==="bottom"?M.originalHeight+A:M.originalHeight-A;e(F),F<70?n(!1):n(!0)},Q=()=>{g(!1),document.removeEventListener("mousemove",E),document.removeEventListener("mouseUp",Q)};document.addEventListener("mousemove",E),document.addEventListener("mouseup",Q)};L(()=>{if(o()){const v=d()?.parentElement?.style.paddingBottom,w=()=>{s&&d()?.parentElement&&l(M=>(M?.parentElement,M))};if(w(),typeof window<"u")return(r().pipWindow??window).addEventListener("resize",w),()=>{(r().pipWindow??window).removeEventListener("resize",w),d()?.parentElement&&typeof v=="string"&&l(M=>M)}}else d()?.parentElement&&l(v=>(v?.parentElement&&v.parentElement.removeAttribute("style"),v))}),L(()=>{window.addEventListener("keydown",v=>{v.key==="Escape"&&o()&&f()})}),Zr(o),L(()=>{if(d()){const v=d(),w=getComputedStyle(v).fontSize;v?.style.setProperty("--tsrd-font-size",w)}}),L(()=>{const v=bt(t().openHotkey);for(const w of v)Ut(w,()=>{f()})});const{theme:b}=Be();return u(Yt,{get theme(){return b()},get children(){return u(Tt,{get mount(){return(r().pipWindow??window).document.body},get children(){var v=fa();return ie(l,v),Y(v,"data-testid",$e),h(v,u(B,{get when(){return R(()=>r().pipWindow!==null)()?!0:R(()=>!!t().requireUrlFlag)()?window.location.search.includes(t().urlFlag):!0},get children(){return[u(an,{isOpen:o,setIsOpen:f}),u(ln,{isResizing:c,isOpen:o,get children(){return u(sn,{ref:w=>s=w,handleDragStart:w=>C(s,w),get children(){return[u(ga,{toggleOpen:f}),u(pa,{})]}})}})]}}),null),h(v,u(ha,{}),null),v}})}})}export{ba as default};
