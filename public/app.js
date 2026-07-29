async function fetchHealth() {
  const versionEl = document.getElementById('version');
  const statusEl = document.getElementById('api-status');
  const timestampEl = document.getElementById('timestamp');
  const button = document.getElementById('refresh-btn');

  button.disabled = true;
  statusEl.textContent = 'checking...';
  statusEl.className = 'status-value pending';

  try {
    const res = await fetch('/api/health');
    if (!res.ok) {
      throw new Error('Request failed with status ' + res.status);
    }
    const data = await res.json();

    versionEl.textContent = data.version;
    statusEl.textContent = data.status;
    statusEl.className = 'status-value online';
    timestampEl.textContent = new Date(data.timestamp).toLocaleString();
  } catch (err) {
    statusEl.textContent = 'offline';
    statusEl.className = 'status-value offline';
    timestampEl.textContent = new Date().toLocaleString();
  } finally {
    button.disabled = false;
  }
}

document.getElementById('refresh-btn').addEventListener('click', fetchHealth);
fetchHealth();
