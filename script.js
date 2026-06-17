document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.querySelector(".register-right form");

    if (!registerForm) return;

    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let hasError = false;

        // INPUTS 
        const nin = registerForm.querySelector('input[name="nin"]');
        const tel = registerForm.querySelector('input[name="tel"]');
        const birth = registerForm.querySelector('input[name="date_naiss"]'); // ✅ corrigé

        // RESET STYLES
        [nin, tel, birth].forEach(input => {
            if (input) input.style.border = "1px solid #ddd";
        });

        // -----------------------------
        // 1. NIN (18 chiffres)
        // -----------------------------
        const ninRegex = /^[0-9]{18}$/;
        if (!ninRegex.test(nin.value.trim())) {
            nin.style.border = "2px solid red";
            alert("❌ NIN doit contenir exactement 18 chiffres");
            hasError = true;
        }

        // -----------------------------
        // 2. TELEPHONE ALGÉRIE
        // -----------------------------
        const telRegex = /^(05|06|07)[0-9]{8}$/;
        if (!telRegex.test(tel.value.trim())) {
            tel.style.border = "2px solid red";
            alert("❌ Numéro de téléphone invalide");
            hasError = true;
        }

        // -----------------------------
        // 3. EMAIL 
        // -----------------------------
        const email = registerForm.querySelector('input[name="email"]');
        if (!email.value.includes("@")) {
            email.style.border = "2px solid red";
            alert("❌ Email invalide");
            hasError = true;
        }

        // -----------------------------
        // 4. ÂGE (18 ans minimum)
        // -----------------------------
        if (birth && birth.value) {

            let birthDate = new Date(birth.value);
            let today = new Date();

            let age = today.getFullYear() - birthDate.getFullYear();

            let monthDiff = today.getMonth() - birthDate.getMonth();
            let dayDiff = today.getDate() - birthDate.getDate();

            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }

            if (age < 18) {
                birth.style.border = "2px solid red";
                alert("❌ Vous devez avoir 18 ans minimum");
                hasError = true;
            }
        } else {
            alert("❌ Date de naissance obligatoire");
            hasError = true;
        }

        // -----------------------------
        // SUCCESS
        // -----------------------------
        if (!hasError) {
            alert("✅ Inscription validée avec succès !");
            registerForm.submit(); 
        }

    });

});
