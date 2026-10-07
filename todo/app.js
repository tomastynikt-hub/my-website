const list = document.getElementById('list');
const form = document.getElementById('form');
const input = document.getElementById('input');
const count = document.getElementById('count');
let filter = 'all';
let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function save() { localStorage.setItem('todos', JSON.stringify(todos)); }
function render() {
  list.innerHTML = '';
  const shown = todos.filter(t => filter === 'all' || (filter === 'done' ? t.done : !t.done));
  for (const t of shown) {
    const li = document.createElement('li');
    if (t.done) li.className = 'done';
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.checked = !!t.done;
    cb.onchange = () => { t.done = cb.checked; save(); render(); };
    const span = document.createElement('span');
    span.textContent = t.text;
    const del = document.createElement('button');
    del.textContent = '×';
    del.onclick = () => { todos = todos.filter(x => x !== t); save(); render(); };
    li.append(cb, span, del);
    list.appendChild(li);
  }
  const left = todos.filter(t => !t.done).length;
  count.textContent = left + ' left';
}
form.onsubmit = e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  input.value = '';
  save(); render();
};
document.querySelectorAll('.filters button').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('.filters button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    filter = b.dataset.f;
    render();
  };
});
render();
