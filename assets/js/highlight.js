import hljs from 'highlight.js/lib/core';

import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import xml from 'highlight.js/lib/languages/xml';
import ini from 'highlight.js/lib/languages/ini';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('ini', ini);
hljs.registerLanguage('toml', ini);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('md', markdown);
hljs.registerLanguage('python', python);

import c from 'highlight.js/lib/languages/c';
hljs.registerLanguage('c', c);

import cpp from 'highlight.js/lib/languages/cpp';
hljs.registerLanguage('cpp', cpp);

import lisp from 'highlight.js/lib/languages/lisp';
hljs.registerLanguage('elisp', lisp);
hljs.registerLanguage('lisp', lisp);

import cmake from 'highlight.js/lib/languages/cmake';
hljs.registerLanguage('cmake', cmake);

import csharp from 'highlight.js/lib/languages/csharp';
hljs.registerLanguage('csharp', csharp);

import scss from 'highlight.js/lib/languages/scss';
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('css', scss);

import lua from 'highlight.js/lib/languages/lua';
hljs.registerLanguage('lua', lua);

import makefile from 'highlight.js/lib/languages/makefile';
hljs.registerLanguage('makefile', makefile);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre code:not(.language-mermaid)').forEach((block) => {
    hljs.highlightElement(block);
  });
});
