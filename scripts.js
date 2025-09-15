// Planner Chromakopia – localStorage + UI logic

const STORE_KEY = 'chromakopia_planner_v1';
let store = {};

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    store = raw ? JSON.parse(raw) : {};
  } catch(e) {
    store = {};
  }
}

function saveStore() {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function initFields() {
  document.querySelectorAll('[data-store]').forEach(el => {
    const id = el.id;
    if (!id) return;
    if (store[id] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
        el.value = store[id];
      } else {
        el.innerHTML = store[id];
      }
    }
    const handler = () => {
      store[id] = (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT')
        ? el.value
        : el.innerHTML;
      saveStore();
    };
    el.addEventListener('input', handler);
    el.addEventListener('blur', handler);
  });

  document.querySelectorAll('[data-store-table]').forEach(table => {
    const key = table.id;
    if (store[key]) {
      try {
        const rows = store[key];
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
        rows.forEach(r => {
          const tr = document.createElement('tr');
            r.forEach(cell => {
            const td = document.createElement('td');
            td.contentEditable = true;
            td.innerHTML = cell;
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
        bindTable(table);
      } catch(e) {}
    } else {
      bindTable(table);
    }
  });
}

function bindTable(table) {
  const saveTable = () => {
    const rows = [];
    table.querySelectorAll('tbody tr').forEach(tr => {
      const cells = [];
      tr.querySelectorAll('td').forEach(td => cells.push(td.innerHTML));
      rows.push(cells);
    });
    store[table.id] = rows;
    saveStore();
  };
  table.addEventListener('input', e => {
    if (e.target.matches('td[contenteditable]')) saveTable();
  });
}

function addExerciseRow() {
  const body = document.getElementById('tr-body');
  const idx = body.children.length + 1;
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${idx}</td>
    <td contenteditable></td>
    <td contenteditable></td>
    <td contenteditable></td>
    <td contenteditable></td>
    <td contenteditable></td>
  `;
  body.appendChild(tr);
  // Rebind table
  const table = document.getElementById('tr-table');
  bindTable(table);
  const event = new Event('input');
  body.dispatchEvent(event);
}

function addParkingRow() {
  const body = document.getElementById('pk-body');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td contenteditable></td>
    <td contenteditable></td>
    <td contenteditable></td>
    <td contenteditable></td>
  `;
  body.appendChild(tr);
  bindTable(document.getElementById('pk-table'));
  const event = new Event('input');
  body.dispatchEvent(event);
}

function initNav() {
  const tabNav = document.getElementById('tabNav');
  tabNav.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      const target = e.target.getAttribute('data-tab');
      document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      document.querySelectorAll('.page.tab').forEach(p => p.classList.remove('active'));
      document.querySelector(`.page[data-tab="${target}"]`).classList.add('active');
      window.scrollTo({ top:0, behavior:'smooth' });
    }
  });
}

function initTheme() {
  const btn = document.getElementById('toggleTheme');
  btn.addEventListener('click', () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'light' ? 'dark' : 'light';
  });
}

function initPrint() {
  document.getElementById('printBtn').addEventListener('click', () => {
    window.print();
  });
}

function clearAll() {
  if (!confirm('¿Resetear todo? Esto borrará los datos locales.')) return;
  localStorage.removeItem(STORE_KEY);
  location.reload();
}

function initClear() {
  document.getElementById('clearAll').addEventListener('click', clearAll);
}

function exportData() {
  const dataStr = JSON.stringify(store, null, 2);
  const blob = new Blob([dataStr], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `planner_export_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
}

function initExport() {
  document.getElementById('exportData').addEventListener('click', exportData);
}

function initImport() {
  const btn = document.getElementById('importDataBtn');
  const file = document.getElementById('importFile');
  btn.addEventListener('click', () => file.click());
  file.addEventListener('change', e => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (confirm('¿Sobrescribir datos actuales?')) {
          store = imported;
          saveStore();
          location.reload();
        }
      } catch(err) {
        alert('Archivo inválido');
      }
    };
    reader.readAsText(f);
  });
}

document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    saveStore();
    const toast = document.createElement('div');
    toast.textContent = 'Guardado';
    Object.assign(toast.style, {
      position:'fixed', bottom:'18px', left:'50%', transform:'translateX(-50%)',
      background:'linear-gradient(135deg,var(--accent),var(--accent-pink))',
      color:'#fff', padding:'6px 16px', fontSize:'.75rem',
      borderRadius:'999px', boxShadow:'0 6px 20px -6px rgba(0,0,0,.5)', zIndex:9999,
      letterSpacing:'.5px', fontWeight:'500'
    });
    document.body.appendChild(toast);
    setTimeout(()=> toast.remove(), 1400);
  }
});

function init() {
  loadStore();
  initFields();
  initNav();
  initTheme();
  initPrint();
  initClear();
  initExport();
  initImport();
  document.getElementById('addExercise').addEventListener('click', addExerciseRow);
  document.getElementById('addParking').addEventListener('click', addParkingRow);
}

init();