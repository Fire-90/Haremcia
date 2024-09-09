let currentModal = null;
let currentArch = null;
let last_command = '';

document.getElementById('unlock-btn').addEventListener('click', function() {
    const terminalOutput = document.getElementById('terminal-output');
    const scrollableArea = document.querySelector('.terminal-body');

    document.getElementById('unlock-btn').classList.add('hidden');
    document.getElementById('terminal').classList.remove('hidden');
    document.getElementById('terminal-input').focus();

    setTimeout(function() {
        terminalOutput.innerHTML += `<p>Accesing Terminal.</p>`;
    }, 100); 
    setTimeout(function() {
        terminalOutput.innerHTML += `<p>Accesing Terminal..</p>`;
    }, 300); 
    setTimeout(function() {
        terminalOutput.innerHTML += `<p>Accesing Terminal...</p>`;
    }, 500); 
    setTimeout(function() {
        terminalOutput.innerHTML += `<p>[User] : Director</p>`;
        terminalOutput.innerHTML += `<p>[Password] : ✲✲✲✲✲✲✲✲✲</p>`;
        scrollableArea.scrollTop = scrollableArea.scrollHeight;
    }, 1000); 
    setTimeout(function() {
        terminalOutput.innerHTML += `<p>Connecting.</p>`;
        scrollableArea.scrollTop = scrollableArea.scrollHeight;
    }, 1200); 
    setTimeout(function() {
        terminalOutput.innerHTML += `<p>Connecting..</p>`;
        scrollableArea.scrollTop = scrollableArea.scrollHeight;
    }, 1400); 
    setTimeout(function() {
        terminalOutput.innerHTML += `<p>Connecting...</p>`;
        scrollableArea.scrollTop = scrollableArea.scrollHeight;
    }, 1500); 
    setTimeout(function() {
        terminalOutput.innerHTML += `<p>[Acces Granted]</p>`;
        scrollableArea.scrollTop = scrollableArea.scrollHeight;
    }, 2100); 
    setTimeout(function() {
        terminalOutput.innerHTML += `<p>[LOG ACCESSIBLE]</p>`;
        scrollableArea.scrollTop = scrollableArea.scrollHeight;
    }, 2300); 
    setTimeout(function() {
        terminalOutput.innerHTML += `<p>log_001 | log_002 | log_003 | log_004</p>`;
        terminalOutput.innerHTML += `<p>log_005 | log_006 | log_███ | log_███</p>`;
        terminalOutput.innerHTML += `<p>Please select a log :</p>`;
        scrollableArea.scrollTop = scrollableArea.scrollHeight;
    }, 2500); 
});

document.getElementById('terminal-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = e.target.value.trim();
        const terminalOutput = document.getElementById('terminal-output');
        const scrollableArea = document.querySelector('.terminal-body');
        e.target.value = '';

        if (command.startsWith('log_')) {
            if (last_command.startsWith('log_')) {
                terminalOutput.innerHTML += `<p>Closing ${last_command}...</p>`;
            }
            last_command = command
            terminalOutput.innerHTML += `<p>Opening ${command}...</p>`;
            openLog(command);
        } else {
            terminalOutput.innerHTML += `<p>ERROR [${command}]</p>`;
        }

        scrollableArea.scrollTop = scrollableArea.scrollHeight;
        }
});

function openLog(modalId) {
    const terminalOutput = document.getElementById('terminal-output');
    const scrollableArea = document.querySelector('.terminal-body');

    if (currentModal) {
        currentModal.classList.add('hidden'); // Fermer le modal actuel
    }

    const modal = document.getElementById(modalId);

    if (modal) {
        modal.classList.remove('hidden');
        currentModal = modal; // Mettre à jour le modal actuel

        modal.querySelector('.close').addEventListener('click', function() {
            modal.classList.add('hidden');
            currentModal = null; // Réinitialiser lorsque le modal est fermé
        });
    } else {
        const terminalOutput = document.getElementById('terminal-output');
        terminalOutput.innerHTML += `<p>Aucun LOG trouvé pour : ${modalId}</p>`;
        last_command = ''
    }

    scrollableArea.scrollTop = scrollableArea.scrollHeight;
}


// Sélection des éléments
const openArchiveBtn = document.getElementById('openArchiveBtn');
const closeArchiveBtn = document.getElementById('closeArchiveBtn');
const archiveInterface = document.querySelector('.archiveInterface');
const folderButtons = document.querySelectorAll('.folder-btn');
const selectedArchiveDiv = document.getElementById('selectedArchive');
const archiveContentDiv = document.querySelector('.archive-content');
const closeContentBtn = document.querySelector('.archive-content .close');

// Afficher l'interface des archives au clic sur le bouton
openArchiveBtn.addEventListener('click', () => {
    archiveInterface.classList.remove('hidden');
    openArchiveBtn.classList.add('hidden');
});

// Fermer l'interface des archives au clic sur le bouton "Fermer"
closeArchiveBtn.addEventListener('click', () => {
    archiveInterface.classList.add('hidden');
    openArchiveBtn.classList.remove('hidden');
});

document.querySelectorAll('.folder-btn').forEach(button => {
    button.addEventListener('click', function() {
        const archiveId = this.getAttribute('data-archive');
        OpenArch(archiveId);
    });
});

function OpenArch(ArchId) {
    if (currentArch) {
        currentArch.classList.add('hidden'); // Fermer l'archive actuelle
    }

    const Arch = document.getElementById(ArchId);

    if (Arch) {
        Arch.classList.remove('hidden');
        currentArch = Arch; // Mettre à jour l'archive actuelle

        Arch.querySelector('.close').addEventListener('click', function() {
            Arch.classList.add('hidden');
            currentArch = null; // Réinitialiser lorsque l'archive est fermée
        });
    }
}

// Fermer l'affichage du contenu de l'archive au clic sur la croix
closeContentBtn.addEventListener('click', () => {
    selectedArchiveDiv.classList.add('hidden');
});