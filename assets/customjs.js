document.addEventListener("DOMContentLoaded", function () {
    const vendorDropdown = document.getElementById("vendor-dropdown");
    const addUpsellButton = document.getElementById("add-upsell-to-cart");

    addUpsellButton.addEventListener("click", function () {
        const selectedVendorId = vendorDropdown.value;
        
        if (!selectedVendorId) {
            alert("Please select a vendor to add.");
            return;
        }

        fetch('/cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                items: [{ id: selectedVendorId, quantity: 1 }] 
            })
        })
        .then(response => response.json())
        .then(() => window.location.href = "/cart")
        .catch(error => console.error("Error adding upsell:", error));
    });
});