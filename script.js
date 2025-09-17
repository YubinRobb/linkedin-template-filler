// DOM elements
const templateForm = document.getElementById('templateForm');
const errorMessage = document.getElementById('errorMessage');
const templateContent = document.getElementById('templateContent');
const copyTemplateBtn = document.getElementById('copyTemplate');
const downloadTemplateBtn = document.getElementById('downloadTemplate');
const clearFormBtn = document.getElementById('clearForm');

// Form input elements
const jobTitleInput = document.getElementById('jobTitle');
const locationInput = document.getElementById('location');
const numProfessionalsInput = document.getElementById('numProfessionals');
const customFilterInput = document.getElementById('customFilter');
const connectionMessageInput = document.getElementById('connectionMessage');

// Event listeners for real-time updates
jobTitleInput.addEventListener('input', updateTemplateRealTime);
locationInput.addEventListener('input', updateTemplateRealTime);
numProfessionalsInput.addEventListener('input', updateTemplateRealTime);
customFilterInput.addEventListener('input', updateTemplateRealTime);
connectionMessageInput.addEventListener('input', updateTemplateRealTime);

clearFormBtn.addEventListener('click', clearForm);
copyTemplateBtn.addEventListener('click', copyToClipboard);
downloadTemplateBtn.addEventListener('click', downloadTemplate);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateTemplateRealTime();
});

// Real-time template update function
function updateTemplateRealTime() {
    const formData = getFormData();
    const template = generateTemplateHTML(formData);
    templateContent.innerHTML = template;
}

function getFormData() {
    return {
        jobTitle: jobTitleInput.value.trim() || '[Job Title]',
        location: locationInput.value.trim() || '[Location]',
        numProfessionals: numProfessionalsInput.value.trim() || '[Number]',
        customFilter: customFilterInput.value.trim(),
        connectionMessage: connectionMessageInput.value.trim() || '[Connection Message]'
    };
}

function generateTemplateHTML(data) {
    return `
        <div class="template-block">
            <div class="block-title">🎯 Objective</div>
            <div class="block-content">
                Automate sending connection requests on LinkedIn to targeted professionals.
            </div>
        </div>

        <div class="template-block">
            <div class="block-title">🔐 Login</div>
            <div class="block-content">
                Prompt the user to securely log into LinkedIn. The system should not expose or handle credentials.
                <div class="field-item">
                    <span class="field-label">Input Field:</span> Provide a space for the user to confirm they are logged in.
                </div>
            </div>
        </div>

        <div class="template-block">
            <div class="block-title">🔍 Search</div>
            <div class="block-content">
                Find <span class="field-value">${data.numProfessionals}</span> professionals with the title <span class="field-value">${data.jobTitle}</span> based in <span class="field-value">${data.location}</span>.
                <div class="field-item"><span class="field-label">Job Title:</span> <span class="field-value">${data.jobTitle}</span></div>
                <div class="field-item"><span class="field-label">Location:</span> <span class="field-value">${data.location}</span></div>
                <div class="field-item"><span class="field-label">Number of Professionals to Search:</span> <span class="field-value">${data.numProfessionals}</span></div>
            </div>
        </div>

        <div class="template-block">
            <div class="block-title">🎯 Filter & AI Analysis</div>
            <div class="block-content">
                <strong>Basic Filtering:</strong> Confirm each profile matches the <span class="field-value">${data.jobTitle}</span> and <span class="field-value">${data.location}</span>. Skip profiles that do not match.
                ${data.customFilter ? `
                <div class="field-item" style="margin-top: 12px; padding: 12px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                    <span class="field-label">🤖 AI Intelligence Instructions:</span>
                    <div style="margin-top: 8px; font-weight: 500; color: #856404;">${data.customFilter}</div>
                    <div style="margin-top: 8px; font-size: 13px; color: #856404; font-style: italic;">
                        Use professional judgment to assess language capabilities from profile content. Look for indicators such as: bilingual skills mentioned, international work experience, education in Chinese-speaking regions, Chinese company experience, or language certifications. Make reasonable assessments based on professional background rather than appearance or ethnicity.
                    </div>
                </div>
                ` : ''}
                <div style="margin-top: 12px; font-weight: 600;">Basic Input Fields:</div>
                <div class="field-item"><span class="field-label">Title to Match:</span> <span class="field-value">${data.jobTitle}</span></div>
                <div class="field-item"><span class="field-label">Location to Match:</span> <span class="field-value">${data.location}</span></div>
                ${data.customFilter ? `
                <div style="margin-top: 12px; font-weight: 600;">AI Analysis Criteria:</div>
                <div class="field-item"><span class="field-label">Intelligent Filtering Instructions:</span> <span class="field-value">${data.customFilter}</span></div>
                ` : ''}
            </div>
        </div>

        <div class="template-block">
            <div class="block-title">🤝 Connect</div>
            <div class="block-content">
                Send a connection request to each matching professional with the following message. Ensure the request is professional and adheres to LinkedIn's policies.
                <div class="field-item"><span class="field-label">Connection Message:</span> <span class="field-value">${data.connectionMessage}</span></div>
                <div style="margin-top: 8px; font-size: 13px; color: #666;">Ensure the request remains concise and respectful.</div>
            </div>
        </div>

        <div class="template-block">
            <div class="block-title">📊 Log Actions</div>
            <div class="block-content">
                Keep a log of the following actions:
                <div class="field-item">• Profiles Visited</div>
                <div class="field-item">• Connection Requests Sent</div>
                <div class="field-item">• Profiles Skipped (and reason why)</div>
                <div style="margin-top: 8px; font-size: 13px; color: #666;">The log should be detailed and include relevant timestamps and actions taken.</div>
            </div>
        </div>

        <div class="template-block">
            <div class="block-title">⚙️ Rules / Behavior Guidelines</div>
            <div class="block-content">
                <div class="field-item"><strong>Autonomy:</strong> Execute all actions autonomously, without prompting the user for verification or confirmation before sending connection requests.</div>
                <div class="field-item"><strong>No Manual Actions:</strong> Do not perform actions outside the defined automation environment.</div>
                <div class="field-item"><strong>Compliance:</strong> Ensure compliance with LinkedIn's terms and conditions, avoiding actions that could lead to account restrictions or spam reports.</div>
                <div class="field-item"><strong>Execution Order:</strong> Complete each step sequentially and confirm the completion of each step before proceeding to the next.</div>
            </div>
        </div>

        <div class="template-block">
            <div class="block-title">✅ Success Criteria</div>
            <div class="block-content">
                All <span class="field-value">${data.numProfessionals}</span> connection requests are sent to valid profiles with the <span class="field-value">${data.connectionMessage}</span>, without triggering LinkedIn restrictions.
                <div style="margin-top: 12px; font-weight: 600;">A complete log of all actions is returned, including:</div>
                <div class="field-item">• Profiles visited</div>
                <div class="field-item">• Connection requests sent</div>
                <div class="field-item">• Profiles skipped and reasons for skipping</div>
            </div>
        </div>
    `;
}



function clearForm() {
    templateForm.reset();
    hideError();
    updateTemplateRealTime();
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.scrollIntoView({ behavior: 'smooth' });
}

function hideError() {
    errorMessage.style.display = 'none';
}

function generatePlainTextTemplate(data) {
    return `Objective: Automate sending connection requests on LinkedIn to targeted professionals.

Instructions:

Login:
Prompt the user to securely log into LinkedIn. The system should not expose or handle credentials.
Input Field: Provide a space for the user to confirm they are logged in.

Search:
Find ${data.numProfessionals} professionals with the title ${data.jobTitle} based in ${data.location}.
Input Fields:
Job Title: ${data.jobTitle}
Location: ${data.location}
Number of Professionals to Search: ${data.numProfessionals}

Filter & AI Analysis:
Basic Filtering: Confirm each profile matches the ${data.jobTitle} and ${data.location}. Skip profiles that do not match.${data.customFilter ? `
AI Intelligence Instructions: ${data.customFilter}
Use professional judgment to assess language capabilities from profile content. Look for indicators such as: bilingual skills mentioned, international work experience, education in Chinese-speaking regions, Chinese company experience, or language certifications. Make reasonable assessments based on professional background rather than appearance or ethnicity.` : ''}
Basic Input Fields:
Title to Match: ${data.jobTitle}
Location to Match: ${data.location}${data.customFilter ? `
AI Analysis Criteria:
Intelligent Filtering Instructions: ${data.customFilter}` : ''}

Connect:
Send a connection request to each matching professional with the following message. Ensure the request is professional and adheres to LinkedIn's policies.
Connection Message: ${data.connectionMessage}
Ensure the request remains concise and respectful.

Log Actions:
Keep a log of the following actions:
• Profiles Visited
• Connection Requests Sent
• Profiles Skipped (and reason why)
The log should be detailed and include relevant timestamps and actions taken.

Rules / Behavior Guidelines:
Autonomy: Execute all actions autonomously, without prompting the user for verification or confirmation before sending connection requests.
No Manual Actions: Do not perform actions outside the defined automation environment.
Compliance: Ensure compliance with LinkedIn's terms and conditions, avoiding actions that could lead to account restrictions or spam reports.
Execution Order: Complete each step sequentially and confirm the completion of each step before proceeding to the next.

Success Criteria:
All ${data.numProfessionals} connection requests are sent to valid profiles with the ${data.connectionMessage}, without triggering LinkedIn restrictions.
A complete log of all actions is returned, including:
• Profiles visited
• Connection requests sent
• Profiles skipped and reasons for skipping`;
}

async function copyToClipboard() {
    try {
        const formData = getFormData();
        const plainTextTemplate = generatePlainTextTemplate(formData);
        await navigator.clipboard.writeText(plainTextTemplate);

        // Provide visual feedback
        const originalText = copyTemplateBtn.textContent;
        copyTemplateBtn.textContent = 'Copied!';
        copyTemplateBtn.style.background = '#28a745';

        setTimeout(() => {
            copyTemplateBtn.textContent = originalText;
            copyTemplateBtn.style.background = '';
        }, 2000);

    } catch (err) {
        // Fallback for older browsers
        const formData = getFormData();
        const plainTextTemplate = generatePlainTextTemplate(formData);
        const textArea = document.createElement('textarea');
        textArea.value = plainTextTemplate;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // Provide visual feedback
        const originalText = copyTemplateBtn.textContent;
        copyTemplateBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyTemplateBtn.textContent = originalText;
        }, 2000);
    }
}

function downloadTemplate() {
    const formData = getFormData();
    const plainTextTemplate = generatePlainTextTemplate(formData);
    const jobTitle = formData.jobTitle.replace(/[\[\]]/g, '').replace(/\s+/g, '-').toLowerCase();
    const filename = `linkedin-template-${jobTitle}-${new Date().toISOString().split('T')[0]}.txt`;

    const blob = new Blob([plainTextTemplate], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // Provide visual feedback
    const originalText = downloadTemplateBtn.textContent;
    downloadTemplateBtn.textContent = 'Downloaded!';
    downloadTemplateBtn.style.background = '#28a745';

    setTimeout(() => {
        downloadTemplateBtn.textContent = originalText;
        downloadTemplateBtn.style.background = '';
    }, 2000);
}
