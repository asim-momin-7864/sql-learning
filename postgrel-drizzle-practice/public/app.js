// Base URL for the API
const API_URL = '/api/notes';

// Helper function to render responses
const renderResponse = (elementId, data) => {
    const element = document.getElementById(elementId);
    element.textContent = JSON.stringify(data, null, 2);
};

// --- CREATE Note ---
document.getElementById('create-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const status = document.getElementById('status').value;
    const tagsInput = document.getElementById('tags').value;
    
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, status, tags })
        });
        const data = await response.json();
        renderResponse('create-response', data);
    } catch (error) {
        renderResponse('create-response', { error: error.message });
    }
});

// --- FETCH All Notes ---
document.getElementById('fetch-notes-btn').addEventListener('click', async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderResponse('fetch-response', data);
    } catch (error) {
        renderResponse('fetch-response', { error: error.message });
    }
});

// --- FETCH Single Note ---
document.getElementById('fetch-single-btn').addEventListener('click', async () => {
    const id = document.getElementById('note-id').value;
    if (!id) return alert('Please enter a Note ID');
    
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        renderResponse('manage-response', data);
    } catch (error) {
        renderResponse('manage-response', { error: error.message });
    }
});

// --- DELETE Note ---
document.getElementById('delete-btn').addEventListener('click', async () => {
    const id = document.getElementById('note-id').value;
    if (!id) return alert('Please enter a Note ID');
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        renderResponse('manage-response', data);
    } catch (error) {
        renderResponse('manage-response', { error: error.message });
    }
});

// --- UPDATE Note ---
document.getElementById('update-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('note-id').value;
    if (!id) return alert('Please enter a Note ID above first');

    const title = document.getElementById('update-title').value;
    const content = document.getElementById('update-content').value;
    const is_archived = document.getElementById('update-archived').checked;

    // Only send fields that have values (simple implementation)
    const payload = {};
    if (title) payload.title = title;
    if (content) payload.content = content;
    payload.is_archived = is_archived;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        renderResponse('manage-response', data);
    } catch (error) {
        renderResponse('manage-response', { error: error.message });
    }
});
