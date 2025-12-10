const questions = document.querySelectorAll('.question');

questions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');

        // Close all others
        document.querySelectorAll('.item').forEach(i => {
            i.classList.remove('active');
        });

        // Toggle current
        if (!isActive) {
            item.classList.add('active');
        }
    });
});
