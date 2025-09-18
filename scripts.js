document.addEventListener('DOMContentLoaded', function() {
    const projectLinks = document.querySelectorAll('.projet-list a');
    const welcomeSection = document.querySelector('.frame-content-left .welcome');
    const projectSections = document.querySelectorAll('.projet-content');
    const frameContentLeft = document.querySelector('.frame-content-left');
    const modal = document.getElementById("project-modal");
    const modalContent = document.querySelector(".modal-body");
    const closeModal = document.querySelector(".close");

    if (!modalContent) {
        console.error("Modal content element not found");
        return;
    }

    let currentProject = null;

    projectLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const projectId = this.getAttribute('data-id');

            if (currentProject === projectId) {
                frameContentLeft.classList.add('fade-out');

                setTimeout(() => {
                    projectSections.forEach(section => section.style.display = 'none');
                    welcomeSection.style.display = 'block';
                    frameContentLeft.classList.remove('fade-out');
                }, 500);

                currentProject = null;
            } else {
                frameContentLeft.classList.add('fade-out');

                setTimeout(() => {
                    projectSections.forEach(section => section.style.display = 'none');
                    welcomeSection.style.display = 'none';

                    const projectContent = document.getElementById(projectId);

                    if (projectContent) {
                        projectContent.style.display = 'block';
                    }

                    frameContentLeft.classList.remove('fade-out');
                }, 500);

                currentProject = projectId;
            }
        });
    });

    document.querySelectorAll('.link-project a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const projectType = this.getAttribute('data-type');
            const projectIds = this.getAttribute('data-id').split(',');

            modalContent.innerHTML = ''; // Clear previous content

            if (projectType === 'video') {
                const video = document.createElement('video');
                video.controls = true;
                const source = document.createElement('source');
                source.src = `./videos/${projectIds[0]}.mp4`;
                source.type = 'video/mp4';
                video.appendChild(source);
                modalContent.appendChild(video);
            } else if (projectType === 'images') {
                let currentIndex = 0;

                const imageGallery = document.createElement('div');
                imageGallery.className = 'image-gallery';

                const img = document.createElement('img');
                img.src = `./images/${projectIds[currentIndex]}`;
                img.alt = `Image ${projectIds[currentIndex]}`;
                imageGallery.appendChild(img);

                if (projectIds.length > 1) {
                    const prevButton = document.createElement('button');
                    prevButton.innerHTML = '';
                    prevButton.className = 'prev';
                    prevButton.onclick = function() {
                        currentIndex = (currentIndex > 0) ? currentIndex - 1 : projectIds.length - 1;
                        img.src = `./images/${projectIds[currentIndex]}`;
                        img.alt = `Image ${projectIds[currentIndex]}`;
                    };

                    const nextButton = document.createElement('button');
                    nextButton.innerHTML = '';
                    nextButton.className = 'next';
                    nextButton.onclick = function() {
                        currentIndex = (currentIndex < projectIds.length - 1) ? currentIndex + 1 : 0;
                        img.src = `./images/${projectIds[currentIndex]}`;
                        img.alt = `Image ${projectIds[currentIndex]}`;
                    };

                    modalContent.appendChild(prevButton);
                    modalContent.appendChild(nextButton);
                }

                modalContent.appendChild(imageGallery);
            }

            modal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});