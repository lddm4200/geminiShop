// Đảm bảo mã JavaScript chỉ chạy sau khi toàn bộ trang đã được tải
document.addEventListener('DOMContentLoaded', function() {

    // --- Logic cho Light/Dark Theme ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    // Hàm để áp dụng theme
    function applyTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Hàm để chuyển đổi theme
    function toggleTheme() {
        const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    }

    // Gắn sự kiện click cho nút
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Kiểm tra theme đã lưu hoặc theme hệ thống khi tải trang
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    }
    // --- Kết thúc Logic Theme ---

    // --- Logic cho Menu di động ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.main-nav a');

    // Hàm để đóng menu
    function closeMenu() {
        mainNav.classList.remove('is-open');
        overlay.classList.remove('is-active');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    if (menuToggle && mainNav && overlay) {
        menuToggle.addEventListener('click', function() {
            const isOpen = mainNav.classList.toggle('is-open');
            overlay.classList.toggle('is-active');
            menuToggle.classList.toggle('is-active');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        overlay.addEventListener('click', closeMenu);
        navLinks.forEach(link => link.addEventListener('click', closeMenu));
    }
    // --- Kết thúc Logic cho Menu di động ---


    // --- Logic Giỏ Hàng ---
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // "Cơ sở dữ liệu" sản phẩm
    const allProducts = [
        { id: '1', name: 'Áo Thun Cotton', category: 'ao', price: 250000, image: 'https://res.cloudinary.com/dyuvzamg5/image/upload/v1760338851/hg6ev035sdvub0k23dop.webp', description: 'Áo thun được làm từ 100% cotton cao cấp, thoáng mát và thấm hút mồ hôi tốt. Kiểu dáng basic, dễ dàng phối với nhiều loại trang phục.' },
        { id: '2', name: 'Quần Jean Skinny', category: 'quan', price: 550000, image: 'https://res.cloudinary.com/dyuvzamg5/image/upload/v1760338268/hch321uv0knlbm7r8n8o.webp', description: 'Quần jean skinny với chất liệu co giãn tốt, ôm dáng tôn đường cong cơ thể. Màu xanh classic không bao giờ lỗi mốt.' },
        { id: '3', name: 'Váy Hoa Mùa Hè', category: 'vay', price: 480000, image: 'https://res.cloudinary.com/dyuvzamg5/image/upload/v1760338523/dz0b463ilup55fhc4vz9.webp', description: 'Chiếc váy hoa nhí mang đậm không khí mùa hè, chất liệu voan nhẹ nhàng, bay bổng. Thích hợp cho những buổi dạo phố hoặc du lịch.' },
        { id: '4', name: 'Áo Sơ Mi Lụa', category: 'ao', price: 420000, image: 'https://res.cloudinary.com/dyuvzamg5/image/upload/v1760338669/ne7n8fy49zoqizmacmta.webp', description: 'Áo sơ mi lụa mềm mại, mang lại vẻ ngoài thanh lịch và sang trọng. Thiết kế tối giản, phù hợp cho môi trường công sở.' },
        { id: '5', name: 'Quần Short Kaki', category: 'quan', price: 320000, image: 'https://res.cloudinary.com/dyuvzamg5/image/upload/v1760338851/hg6ev035sdvub0k23dop.webp', description: 'Quần short kaki năng động, chất vải dày dặn nhưng vẫn thoáng mát. Lựa chọn hoàn hảo cho các hoạt động ngoài trời.' },
        { id: '6', name: 'Chân Váy Tennis', category: 'vay', price: 290000, image: 'https://res.cloudinary.com/dyuvzamg5/image/upload/v1760338935/msnr8o7n0etwtslrm7zt.webp', description: 'Chân váy tennis xếp ly trẻ trung, dễ dàng kết hợp với áo thun hoặc croptop để tạo nên set đồ cá tính.' },
        { id: '7', name: 'Áo Khoác Bomber', category: 'ao', price: 750000, image: 'https://res.cloudinary.com/dyuvzamg5/image/upload/v1760339013/t4x1bnodvavzvwftx7ox.webp', description: 'Mô tả chi tiết cho Áo Khoác Bomber. Phong cách và cá tính.' },
        { id: '8', name: 'Quần Jogger', category: 'quan', price: 450000, image: 'https://res.cloudinary.com/dyuvzamg5/image/upload/v1760339077/bjdqppxajb8by4diziwk.png', description: 'Mô tả chi tiết cho Quần Jogger. Thoải mái và năng động.' },
        { id: '9', name: 'Váy Maxi', category: 'vay', price: 850000, image: 'https://res.cloudinary.com/dyuvzamg5/image/upload/v1760339178/ekrkhom5yiyxxwnsgumw.webp', description: 'Mô tả chi tiết cho Váy Maxi. Thướt tha và quyến rũ.' },
        { id: '10', name: 'Áo Polo', category: 'ao', price: 350000, image: 'https://res.cloudinary.com/dyuvzamg5/image/upload/v1760339283/szpldjl29ipe1rt0yk0z.webp', description: 'Mô tả chi tiết cho Áo Polo. Lịch sự và trẻ trung.' },
        { id: '11', name: 'Quần Baggy', category: 'quan', price: 480000, image: 'https://res.cloudinary.com/dyuvzamg5/image/upload/v1760339357/t1dtkn50xguhowctxfxu.webp', description: 'Mô tả chi tiết cho Quần Baggy. Rộng rãi và thời thượng.' },
        { id: '12', name: 'Váy Suông', category: 'vay', price: 430000, image: 'https://res.cloudinary.com/dyuvzamg5/image/upload/v1760339425/zqetrytdeukllxve0gzh.webp', description: 'Mô tả chi tiết cho Váy Suông. Đơn giản và thanh lịch.' },
        { id: '13', name: 'Áo Hoodie', category: 'ao', price: 580000, image: 'https://placehold.co/300x400/d1c4b3/333?text=Áo+Hoodie', description: 'Mô tả chi tiết cho Áo Hoodie. Ấm áp và phong cách.' },
        { id: '14', name: 'Quần Culottes', category: 'quan', price: 520000, image: 'https://placehold.co/300x400/b3d1c4/333?text=Quần+Culottes', description: 'Mô tả chi tiết cho Quần Culottes. Sành điệu và thoải mái.' },
        { id: '15', name: 'Váy Bodycon', category: 'vay', price: 620000, image: 'https://placehold.co/300x400/c4b3d1/333?text=Váy+Bodycon', description: 'Mô tả chi tiết cho Váy Bodycon. Tôn dáng và gợi cảm.' },
        { id: '16', name: 'Áo Croptop', category: 'ao', price: 280000, image: 'https://placehold.co/300x400/d1b3b3/333?text=Áo+Croptop', description: 'Mô tả chi tiết cho Áo Croptop. Năng động và cá tính.' },
        { id: '17', name: 'Quần Legging', category: 'quan', price: 250000, image: 'https://placehold.co/300x400/b3d1b3/333?text=Quần+Legging', description: 'Mô tả chi tiết cho Quần Legging. Co giãn và tiện lợi.' },
        { id: '18', name: 'Váy Sơ Mi', category: 'vay', price: 550000, image: 'https://placehold.co/300x400/b3b3d1/333?text=Váy+Sơ+Mi', description: 'Mô tả chi tiết cho Váy Sơ Mi. Thanh lịch và hiện đại.' },
        { id: '19', name: 'Áo Len', category: 'ao', price: 480000, image: 'https://placehold.co/300x400/d1c4b3/333?text=Áo+Len', description: 'Mô tả chi tiết cho Áo Len. Mềm mại và ấm áp.' },
        { id: '20', name: 'Quần Tây', category: 'quan', price: 600000, image: 'https://placehold.co/300x400/b3d1c4/333?text=Quần+Tây', description: 'Mô tả chi tiết cho Quần Tây. Lịch lãm và chuyên nghiệp.' },
        { id: '21', name: 'Váy Yếm', category: 'vay', price: 470000, image: 'https://placehold.co/300x400/c4b3d1/333?text=Váy+Yếm', description: 'Mô tả chi tiết cho Váy Yếm. Dễ thương và trẻ trung.' },
        { id: '22', name: 'Áo Ba Lỗ', category: 'ao', price: 180000, image: 'https://placehold.co/300x400/d1b3b3/333?text=Áo+Ba+Lỗ', description: 'Mô tả chi tiết cho Áo Ba Lỗ. Mát mẻ và thể thao.' },
        { id: '23', name: 'Quần Đũi', category: 'quan', price: 380000, image: 'https://placehold.co/300x400/b3d1b3/333?text=Quần+Đũi', description: 'Mô tả chi tiết cho Quần Đũi. Nhẹ nhàng và thoáng mát.' },
        { id: '24', name: 'Váy Babydoll', category: 'vay', price: 490000, image: 'https://placehold.co/300x400/b3b3d1/333?text=Váy+Babydoll', description: 'Mô tả chi tiết cho Váy Babydoll. Ngọt ngào và đáng yêu.' },
        { id: '25', name: 'Áo Thun Dài Tay', category: 'ao', price: 320000, image: 'https://placehold.co/300x400/d1c4b3/333?text=Áo+Dài+Tay', description: 'Mô tả chi tiết cho Áo Thun Dài Tay. Đơn giản và tiện dụng.' },
        { id: '26', name: 'Quần Jean Rách', category: 'quan', price: 650000, image: 'https://placehold.co/300x400/b3d1c4/333?text=Jean+Rách', description: 'Mô tả chi tiết cho Quần Jean Rách. Bụi bặm và cá tính.' },
        { id: '27', name: 'Váy Xếp Ly', category: 'vay', price: 530000, image: 'https://placehold.co/300x400/c4b3d1/333?text=Váy+Xếp+Ly', description: 'Mô tả chi tiết cho Váy Xếp Ly. Nữ tính và duyên dáng.' },
        { id: '28', name: 'Áo Gió', category: 'ao', price: 550000, image: 'https://placehold.co/300x400/d1b3b3/333?text=Áo+Gió', description: 'Mô tả chi tiết cho Áo Gió. Chống nước và tiện lợi.' },
        { id: '29', name: 'Quần Ống Loe', category: 'quan', price: 580000, image: 'https://placehold.co/300x400/b3d1b3/333?text=Quần+Ống+Loe', description: 'Mô tả chi tiết cho Quần Ống Loe. Cổ điển và sành điệu.' },
        { id: '30', name: 'Váy Ren', category: 'vay', price: 950000, image: 'https://placehold.co/300x400/b3b3d1/333?text=Váy+Ren', description: 'Mô tả chi tiết cho Váy Ren. Sang trọng và quyến rũ.' },
        { id: '31', name: 'Áo Sweater', category: 'ao', price: 520000, image: 'https://placehold.co/300x400/d1c4b3/333?text=Áo+Sweater', description: 'Mô tả chi tiết cho Áo Sweater. Thời trang và ấm áp.' },
        { id: '32', name: 'Quần Cargo', category: 'quan', price: 680000, image: 'https://placehold.co/300x400/b3d1c4/333?text=Quần+Cargo', description: 'Mô tả chi tiết cho Quần Cargo. Nhiều túi và tiện dụng.' },
        { id: '33', name: 'Váy Tweed', category: 'vay', price: 1200000, image: 'https://placehold.co/300x400/c4b3d1/333?text=Váy+Tweed', description: 'Mô tả chi tiết cho Váy Tweed. Quý phái và cổ điển.' },
        { id: '34', name: 'Áo Cardigan', category: 'ao', price: 490000, image: 'https://placehold.co/300x400/d1b3b3/333?text=Áo+Cardigan', description: 'Mô tả chi tiết cho Áo Cardigan. Nhẹ nhàng và nữ tính.' },
        { id: '35', name: 'Quần Jean Ống Rộng', category: 'quan', price: 620000, image: 'https://placehold.co/300x400/b3d1b3/333?text=Jean+Ống+Rộng', description: 'Mô tả chi tiết cho Quần Jean Ống Rộng. Thoải mái và trendy.' },
        { id: '36', name: 'Váy Bút Chì', category: 'vay', price: 580000, image: 'https://placehold.co/300x400/b3b3d1/333?text=Váy+Bút+Chì', description: 'Mô tả chi tiết cho Váy Bút Chì. Tôn dáng và chuyên nghiệp.' },
        { id: '37', name: 'Áo Blouse', category: 'ao', price: 450000, image: 'https://placehold.co/300x400/d1c4b3/333?text=Áo+Blouse', description: 'Mô tả chi tiết cho Áo Blouse. Điệu đà và thanh lịch.' },
        { id: '38', name: 'Quần Yếm', category: 'quan', price: 590000, image: 'https://placehold.co/300x400/b3d1c4/333?text=Quần+Yếm', description: 'Mô tả chi tiết cho Quần Yếm. Năng động và đáng yêu.' },
        { id: '39', name: 'Váy Xòe', category: 'vay', price: 610000, image: 'https://placehold.co/300x400/c4b3d1/333?text=Váy+Xòe', description: 'Mô tả chi tiết cho Váy Xòe. Nữ tính và bồng bềnh.' },
        { id: '40', name: 'Áo Phông In Hình', category: 'ao', price: 300000, image: 'https://placehold.co/300x400/d1b3b3/333?text=Áo+In+Hình', description: 'Mô tả chi tiết cho Áo Phông In Hình. Thể hiện cá tính.' },
        { id: '41', name: 'Quần Kaki', category: 'quan', price: 480000, image: 'https://placehold.co/300x400/b3d1b3/333?text=Quần+Kaki', description: 'Mô tả chi tiết cho Quần Kaki. Bền bỉ và lịch sự.' },
        { id: '42', name: 'Váy Lụa', category: 'vay', price: 980000, image: 'https://placehold.co/300x400/b3b3d1/333?text=Váy+Lụa', description: 'Mô tả chi tiết cho Váy Lụa. Mềm mại và sang trọng.' },
        { id: '43', name: 'Áo Sơ Mi Caro', category: 'ao', price: 460000, image: 'https://placehold.co/300x400/d1c4b3/333?text=Sơ+Mi+Caro', description: 'Mô tả chi tiết cho Áo Sơ Mi Caro. Cổ điển và không lỗi mốt.' },
        { id: '44', name: 'Quần Jean Boyfriend', category: 'quan', price: 630000, image: 'https://placehold.co/300x400/b3d1c4/333?text=Jean+Boyfriend', description: 'Mô tả chi tiết cho Quần Jean Boyfriend. Rộng rãi và cá tính.' },
        { id: '45', name: 'Váy Trễ Vai', category: 'vay', price: 680000, image: 'https://placehold.co/300x400/c4b3d1/333?text=Váy+Trễ+Vai', description: 'Mô tả chi tiết cho Váy Trễ Vai. Quyến rũ và nữ tính.' },
        { id: '46', name: 'Áo Khoác Dạ', category: 'ao', price: 1500000, image: 'https://placehold.co/300x400/d1b3b3/333?text=Áo+Khoác+Dạ', description: 'Mô tả chi tiết cho Áo Khoác Dạ. Sang trọng và ấm áp.' },
        { id: '47', name: 'Quần Short Jean', category: 'quan', price: 420000, image: 'https://placehold.co/300x400/b3d1b3/333?text=Short+Jean', description: 'Mô tả chi tiết cho Quần Short Jean. Năng động và trẻ trung.' },
        { id: '48', name: 'Váy Cổ V', category: 'vay', price: 590000, image: 'https://placehold.co/300x400/b3b3d1/333?text=Váy+Cổ+V', description: 'Mô tả chi tiết cho Váy Cổ V. Gợi cảm và thanh lịch.' },
        { id: '49', name: 'Áo Thun Cổ Tim', category: 'ao', price: 260000, image: 'https://placehold.co/300x400/d1c4b3/333?text=Áo+Cổ+Tim', description: 'Mô tả chi tiết cho Áo Thun Cổ Tim. Nữ tính và đơn giản.' },
        { id: '50', name: 'Quần Ống Suông', category: 'quan', price: 540000, image: 'https://placehold.co/300x400/b3d1c4/333?text=Quần+Ống+Suông', description: 'Mô tả chi tiết cho Quần Ống Suông. Thoải mái và thời thượng.' },
        { id: '51', name: 'Váy Hai Dây', category: 'vay', price: 450000, image: 'https://placehold.co/300x400/c4b3d1/333?text=Váy+Hai+Dây', description: 'Mô tả chi tiết cho Váy Hai Dây. Mát mẻ và quyến rũ.' },
        { id: '52', name: 'Áo Khoác Jean', category: 'ao', price: 820000, image: 'https://placehold.co/300x400/d1b3b3/333?text=Áo+Khoác+Jean', description: 'Mô tả chi tiết cho Áo Khoác Jean. Bụi bặm và không bao giờ lỗi mốt.' },
        { id: '53', name: 'Quần Short Vải', category: 'quan', price: 350000, image: 'https://placehold.co/300x400/b3d1b3/333?text=Short+Vải', description: 'Mô tả chi tiết cho Quần Short Vải. Lịch sự và mát mẻ.' },
        { id: '54', name: 'Váy Voan', category: 'vay', price: 650000, image: 'https://placehold.co/300x400/b3b3d1/333?text=Váy+Voan', description: 'Mô tả chi tiết cho Váy Voan. Nhẹ nhàng và bay bổng.' },
        { id: '55', name: 'Áo Thun Trơn', category: 'ao', price: 220000, image: 'https://placehold.co/300x400/d1c4b3/333?text=Áo+Thun+Trơn', description: 'Mô tả chi tiết cho Áo Thun Trơn. Đơn giản và dễ phối đồ.' },
        { id: '56', name: 'Quần Jean Mom', category: 'quan', price: 610000, image: 'https://placehold.co/300x400/b3d1c4/333?text=Jean+Mom', description: 'Mô tả chi tiết cho Quần Jean Mom. Cổ điển và thoải mái.' },
    ];

    // Lấy giỏ hàng từ localStorage hoặc tạo mới nếu chưa có
    let cart = JSON.parse(localStorage.getItem('geminiShopCart')) || [];

    // Hàm cập nhật số lượng trên icon giỏ hàng
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }

    // Hàm lưu giỏ hàng vào localStorage
    function saveCart() {
        localStorage.setItem('geminiShopCart', JSON.stringify(cart));
    }

    // Hàm thêm sản phẩm vào giỏ
    function addToCart(product, size, quantity) {
        // Tìm sản phẩm trong giỏ hàng có cùng ID và cùng Size
        const existingProductIndex = cart.findIndex(item => item.id === product.id && item.size === size);

        if (existingProductIndex > -1) {
            // Nếu đã có, chỉ tăng số lượng
            cart[existingProductIndex].quantity += quantity;
        } else {
            // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
            cart.push({ ...product, size: size, quantity: quantity });
        }
        saveCart();
        updateCartCount();
    }

    // Hàm tạo hiệu ứng bay vào giỏ hàng
    function flyToCartEffect(event) {
        const cartIcon = document.querySelector('.cart-link');
        if (!cartIcon) return;

        // 1. Tạo phần tử bay
        const flyingElement = document.createElement('div');
        flyingElement.classList.add('fly-to-cart-element');
        document.body.appendChild(flyingElement);

        // 2. Lấy vị trí bắt đầu (từ nút được click) và kết thúc (giỏ hàng)
        const startRect = event.target.getBoundingClientRect();
        const endRect = cartIcon.getBoundingClientRect();

        // 3. Thiết lập vị trí ban đầu
        flyingElement.style.left = `${startRect.left + startRect.width / 2}px`;
        flyingElement.style.top = `${startRect.top + startRect.height / 2}px`;

        // 4. Kích hoạt animation (dùng requestAnimationFrame để đảm bảo trình duyệt đã render vị trí ban đầu)
        requestAnimationFrame(() => {
            flyingElement.style.left = `${endRect.left + endRect.width / 2}px`;
            flyingElement.style.top = `${endRect.top + endRect.height / 2}px`;
            flyingElement.style.transform = 'scale(0)';
            flyingElement.style.opacity = '0';
        });

        // 5. Xóa phần tử sau khi animation kết thúc
        flyingElement.addEventListener('transitionend', () => {
            flyingElement.remove();
        });
    }

    // Gắn sự kiện cho các nút "Thêm vào giỏ"
    // Hàm này sẽ được gọi trong displayProducts và renderProductDetail

    // --- Logic cho trang cart.html ---
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSummaryContainer = document.getElementById('cart-summary');

    function formatCurrency(number) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    }

    function renderCartItems() {
        if (!cartItemsContainer) return; // Chỉ chạy nếu đang ở trang cart.html

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-empty">Giỏ hàng của bạn đang trống.</p>';
            cartSummaryContainer.innerHTML = '';
            return;
        }

        cartItemsContainer.innerHTML = ''; // Xóa nội dung cũ
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <a href="product-detail.html?id=${item.id}" class="cart-item-name-link">
                        <h3>${item.name}</h3>
                    </a>
                    <div class="cart-item-options">
                        <label for="size-select-${index}">Size:</label>
                        <select class="size-select" id="size-select-${index}" data-index="${index}">
                            <option value="S" ${item.size === 'S' ? 'selected' : ''}>S</option>
                            <option value="M" ${item.size === 'M' ? 'selected' : ''}>M</option>
                            <option value="L" ${item.size === 'L' ? 'selected' : ''}>L</option>
                            <option value="XL" ${item.size === 'XL' ? 'selected' : ''}>XL</option>
                        </select>
                    </div>
                    <p class="price-per-item">${formatCurrency(item.price)}</p>
                </div>
                <div class="cart-item-quantity">
                    <input type="number" value="${item.quantity}" min="1" data-index="${index}">
                </div>
                <div class="cart-item-price">${formatCurrency(item.price * item.quantity)}</div>
                <div class="cart-item-remove">
                    <button class="remove-from-cart-btn" data-index="${index}">Xóa</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Cập nhật tổng tiền
        cartSummaryContainer.innerHTML = `
            <h2>Tổng cộng: ${formatCurrency(total)}</h2>
            <div class="cart-summary-actions">
                <button id="clear-cart-btn" class="btn btn-secondary">Xóa tất cả</button>
                <a href="checkout.html" class="btn">Tiến hành thanh toán</a>
            </div>
        `;

        // Thêm sự kiện cho các nút xóa và input số lượng
        addCartActionListeners();
    }

    // Hàm hiển thị modal xác nhận xóa
    function showDeleteConfirmation(message, onConfirm) {
        const modal = document.getElementById('delete-confirmation-modal');
        if (!modal) return;

        const modalMessage = modal.querySelector('#delete-modal-message');
        const confirmBtn = modal.querySelector('#confirm-delete-btn');
        const cancelBtn = modal.querySelector('#cancel-delete-btn');

        modalMessage.textContent = message;
        modal.classList.add('is-visible');

        // Tạo hàm xử lý riêng để có thể gỡ bỏ sự kiện sau khi click
        const handleConfirm = () => {
            onConfirm();
            closeModal();
        };

        const closeModal = () => {
            modal.classList.remove('is-visible');
            confirmBtn.removeEventListener('click', handleConfirm);
            cancelBtn.removeEventListener('click', closeModal);
        };

        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', closeModal);
    }

    function addCartActionListeners() {
        const removeButtons = document.querySelectorAll('.remove-from-cart-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                showDeleteConfirmation('Bạn có chắc chắn muốn xóa sản phẩm này?', () => {
                    cart.splice(index, 1); 
                    saveCart();
                    updateCartCount();
                    renderCartItems();
                });
            });
        });

        const sizeSelectors = document.querySelectorAll('.size-select');
        sizeSelectors.forEach(select => {
            select.addEventListener('change', (e) => {
                const indexToChange = parseInt(e.target.dataset.index);
                const newSize = e.target.value;
                const itemToChange = cart[indexToChange];

                // Tìm xem có sản phẩm nào cùng ID và size mới trong giỏ hàng không
                const existingItemIndex = cart.findIndex((item, index) => 
                    item.id === itemToChange.id && item.size === newSize && index !== indexToChange
                );

                if (existingItemIndex > -1) {
                    // Nếu có, gộp số lượng và xóa sản phẩm cũ
                    cart[existingItemIndex].quantity += itemToChange.quantity;
                    cart.splice(indexToChange, 1);
                } else {
                    // Nếu không, chỉ cần cập nhật size
                    itemToChange.size = newSize;
                }

                saveCart();
                updateCartCount();
                renderCartItems(); // Vẽ lại toàn bộ giỏ hàng
            });
        });

        const quantityInputs = document.querySelectorAll('.cart-item-quantity input');
        quantityInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const index = e.target.dataset.index;
                const newQuantity = parseInt(e.target.value);
                if (newQuantity > 0) {
                    cart[index].quantity = newQuantity;
                    saveCart();
                    updateCartCount();
                    renderCartItems();
                } else {
                    cart.splice(index, 1);
                    saveCart();
                    updateCartCount();
                    renderCartItems();
                }
            });
        });

        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                showDeleteConfirmation('Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?', () => {
                    cart = []; // Xóa tất cả sản phẩm
                    saveCart();
                    updateCartCount();
                    renderCartItems();
                });
            });
        }
    }

    // --- Logic xác thực (validate) form ---
    function validatePhoneNumber(phone) {
        // Biểu thức chính quy cho SĐT Việt Nam (10 số, bắt đầu bằng 0)
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b$/;
        return phoneRegex.test(phone);
    }

    function setupFormValidation() {
        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');
        if (!phoneInput) return;

        phoneInput.addEventListener('input', () => {
            if (validatePhoneNumber(phoneInput.value)) {
                phoneError.style.display = 'none';
            } else {
                phoneError.textContent = 'Số điện thoại không hợp lệ. Vui lòng nhập 10 số và bắt đầu bằng 0.';
                phoneError.style.display = 'block';
            }
        });
    }

    // --- Logic cho Modal Lỗi ---
    function showErrorModal(message) {
        const errorModal = document.getElementById('error-modal');
        const errorMessageEl = document.getElementById('error-modal-message');
        const closeBtn = document.getElementById('close-error-modal-btn');

        if (errorModal && errorMessageEl && closeBtn) {
            errorMessageEl.textContent = message;
            errorModal.classList.add('is-visible');

            closeBtn.onclick = () => {
                errorModal.classList.remove('is-visible');
            };
        }
    }

    // --- Logic cho trang checkout.html ---
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutOrderSummary = document.getElementById('checkout-order-summary');

    function renderCheckoutPage() {
        if (!checkoutForm) return; // Chỉ chạy trên trang checkout

        if (cart.length === 0) {
            window.location.href = 'index.html'; // Nếu giỏ hàng trống, chuyển về trang chủ
            return;
        }

        const shippingOptions = document.querySelectorAll('input[name="shipping"]');
        const shippingFee = parseFloat(document.querySelector('input[name="shipping"]:checked').value);
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const total = subtotal + shippingFee;

        let summaryHTML = '<div class="summary-items-list">';

        cart.forEach(item => {
            summaryHTML += `
                <div class="summary-item">
                    <span>${item.name} ${item.size ? `(Size: ${item.size})` : ''} (x${item.quantity})</span>
                    <span>${formatCurrency(item.price * item.quantity)}</span>
                </div>
            `;
        });
        summaryHTML += '</div>';

        summaryHTML += `
            <div class="summary-item">
                <span>Tạm tính</span>
                <span>${formatCurrency(subtotal)}</span>
            </div>
            <div class="summary-item">
                <span>Phí vận chuyển</span>
                <span>${formatCurrency(shippingFee)}</span>
            </div>
            <div class="summary-item summary-total">
                <span>Tổng cộng</span>
                <span>${formatCurrency(total)}</span>
            </div>
        `;

        checkoutOrderSummary.innerHTML = summaryHTML;

        // Gắn sự kiện submit
        checkoutForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Luôn ngăn form gửi đi ngay lập tức
            
            // Kiểm tra SĐT trước khi mở modal
            const phoneInput = document.getElementById('phone');
            if (!validatePhoneNumber(phoneInput.value)) {
                showErrorModal('Vui lòng kiểm tra lại số điện thoại của bạn.');
                phoneInput.focus();
                return;
            }

            const modal = document.getElementById('confirmation-modal');
            if (modal) {
                modal.classList.add('is-visible');
            }
        });

        // Xử lý các nút trong modal
        const modal = document.getElementById('confirmation-modal');
        const confirmBtn = document.getElementById('confirm-order-btn');
        const cancelBtn = document.getElementById('cancel-order-btn');

        if (modal && confirmBtn && cancelBtn) {
            confirmBtn.addEventListener('click', async () => {
                // --- Bắt đầu logic gửi dữ liệu đến Google Sheet ---

                // Vô hiệu hóa các nút để tránh click nhiều lần
                confirmBtn.disabled = true;
                confirmBtn.textContent = 'Đang xử lý...';
                cancelBtn.disabled = true;

                // 1. Thu thập dữ liệu từ form và giỏ hàng
                const customerData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    address: document.getElementById('address').value,
                    note: document.getElementById('note').value,
                };

                const orderData = {
                    products: cart.map(item => `${item.name} (Size: ${item.size}, SL: ${item.quantity})`).join('; '),
                    subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
                    shippingFee: parseFloat(document.querySelector('input[name="shipping"]:checked').value),
                    total: 0 // Sẽ tính lại
                };
                orderData.total = orderData.subtotal + orderData.shippingFee;

                // 2. Gửi dữ liệu bằng fetch
                const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzdJoSn5jF73Yj20INsxLNp8yFfonerlY7cUnDCzz01vtOwQpQFFOZC_s6mr5gQQEa6/exec";

                try {
                    const response = await fetch(SCRIPT_URL, {
                        method: 'POST',
                        headers: {
                            //'Content-Type': 'application/json' // Apps Script xử lý text/plain tốt hơn
                        },
                        body: JSON.stringify({ customer: customerData, order: orderData }),
                    });

                    // 3. Xử lý sau khi gửi thành công
                    cart = []; // Xóa giỏ hàng
                    saveCart(); // Lưu lại giỏ hàng rỗng
                    window.location.href = 'order-success.html'; // Chuyển đến trang thành công

                } catch (error) {
                    console.error('Error:', error);
                    showErrorModal('Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.');
                    // Kích hoạt lại các nút nếu có lỗi
                    confirmBtn.disabled = false;
                    confirmBtn.textContent = 'Xác nhận';
                    cancelBtn.disabled = false;
                }
            });

            cancelBtn.addEventListener('click', () => {
                modal.classList.remove('is-visible');
            });
        }

        // Gắn sự kiện thay đổi phương thức vận chuyển
        shippingOptions.forEach(option => {
            option.addEventListener('change', renderCheckoutPage);
        });
    }

    // --- Logic cho trang product-detail.html ---
    const productDetailContainer = document.getElementById('product-detail-container');

    function renderProductDetail() {
        if (!productDetailContainer) return; // Chỉ chạy trên trang chi tiết

        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = allProducts.find(p => p.id === productId);

        if (product) {
            document.title = `${product.name} - GeminiShop`; // Cập nhật tiêu đề trang
            productDetailContainer.innerHTML = `
                <div class="product-detail-wrapper">
                    <div class="product-detail-image">
                        <img src="${product.image.replace('300x400', '500x650')}" alt="${product.name}">
                    </div>
                    <div class="product-detail-info">
                        <h1>${product.name}</h1>
                        <p class="price">${formatCurrency(product.price)}</p>
                        
                        <div class="product-options">
                            <div class="option-group">
                                <label>Size:</label>
                                <div class="size-selector">
                                    <button class="size-btn" data-size="S">S</button>
                                    <button class="size-btn" data-size="M">M</button>
                                    <button class="size-btn" data-size="L">L</button>
                                    <button class="size-btn" data-size="XL">XL</button>
                                </div>
                            </div>
                        </div>

                        <div class="product-quantity">
                            <label>Số lượng:</label>
                            <div class="quantity-selector">
                                <button class="quantity-btn" data-action="decrease" aria-label="Giảm số lượng">-</button>
                                <input type="number" id="quantity-input" value="1" min="1" readonly>
                                <button class="quantity-btn" data-action="increase" aria-label="Tăng số lượng">+</button>
                            </div>
                        </div>

                        <p class="description">${product.description}</p>
                        <button class="btn add-to-cart-btn-detail" data-id="${product.id}" disabled>Chọn size để thêm</button>
                    </div>
                </div>

                <div class="size-chart-section">
                    <h2>Bảng Size Tham Khảo</h2>
                    <p>Số đo có thể chênh lệch 1-2cm. Vui lòng liên hệ shop để được tư vấn chính xác hơn.</p>
                    <img src="https://cdn.shopify.com/s/files/1/0802/7401/files/Katin-Mens-Fit-Chart-2022_1_42cb12b3-a300-4866-afa2-cb2626206873.jpg?v=1679010095" alt="Bảng size">
                </div>
            `;

            // --- Gắn sự kiện cho các thành phần mới ---

            // 1. Chọn Size
            const sizeButtons = document.querySelectorAll('.size-btn');
            const addToCartBtn = document.querySelector('.add-to-cart-btn-detail');
            let selectedSize = null;

            // Mặc định chọn size nhỏ nhất (S) khi tải trang
            if (sizeButtons.length > 0) {
                const defaultSizeButton = sizeButtons[0]; // Lấy nút size đầu tiên
                defaultSizeButton.classList.add('selected');
                selectedSize = defaultSizeButton.dataset.size;
                addToCartBtn.disabled = false;
                addToCartBtn.textContent = 'Thêm vào giỏ';
            }

            sizeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    sizeButtons.forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                    selectedSize = button.dataset.size;
                    addToCartBtn.disabled = false;
                    addToCartBtn.textContent = 'Thêm vào giỏ';
                });
            });

            // 2. Tăng/giảm số lượng
            const quantityInput = document.getElementById('quantity-input');
            document.querySelectorAll('.quantity-btn').forEach(button => {
                button.addEventListener('click', () => {
                    let currentValue = parseInt(quantityInput.value);
                    if (button.dataset.action === 'increase') {
                        quantityInput.value = currentValue + 1;
                    } else if (currentValue > 1) {
                        quantityInput.value = currentValue - 1;
                    }
                });
            });

            // 3. Nút "Thêm vào giỏ"
            const detailAddToCartBtn = document.querySelector('.add-to-cart-btn-detail');
            detailAddToCartBtn.addEventListener('click', (e) => {
                const productToAdd = allProducts.find(p => p.id === detailAddToCartBtn.dataset.id);
                const quantity = parseInt(quantityInput.value);
                if (productToAdd && selectedSize && quantity > 0) {
                    addToCart(productToAdd, selectedSize, quantity);
                    flyToCartEffect(e);
                }
            });

        } else {
            productDetailContainer.innerHTML = '<p style="text-align: center; font-size: 1.2rem;">Sản phẩm này không còn tồn tại tại cửa hàng.</p>';
        }
    }

    // --- Logic Lọc và Chia Trang cho trang products.html ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productGrid = document.querySelector('.product-grid');
    const paginationContainer = document.getElementById('pagination-container');

    const searchInput = document.getElementById('search-input');

    let currentPage = 1;
    let productsPerPage = 8; // Mặc định số sản phẩm trên mỗi trang
    let currentFilter = 'all';
    let searchTerm = '';

    function displayProducts() {
        // Chỉ chạy logic này nếu có productGrid
        if (!productGrid) return;

        // Xác định xem có phải trang products.html không để áp dụng phân trang
        const isProductPage = !!paginationContainer;
        if (isProductPage) {
            productsPerPage = 4; // Trang sản phẩm có phân trang, mỗi trang 4 sản phẩm
        }

        // 1. Lọc sản phẩm
        const filteredProducts = allProducts.filter(product => {
            // Kiểm tra điều kiện lọc theo danh mục
            const matchesFilter = currentFilter === 'all' || product.category === currentFilter;
            // Kiểm tra điều kiện tìm kiếm theo tên
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            
            return matchesFilter && matchesSearch;
        });

        // 2. Tính toán chia trang
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        let productsToShow = filteredProducts;

        if (isProductPage) {
            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            productsToShow = filteredProducts.slice(startIndex, endIndex);
        } else {
            productsToShow = filteredProducts.slice(0, 8); // Trang chủ chỉ hiện 8 sản phẩm
        }

        // 3. Hiển thị sản phẩm
        productGrid.innerHTML = ''; // Xóa sản phẩm cũ
        if (productsToShow.length > 0) {
            productsToShow.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.dataset.id = product.id;
                // Thêm các data-attributes khác nếu cần
                productCard.innerHTML = `
                    <div class="product-image-container">
                        <a href="product-detail.html?id=${product.id}" class="product-link">
                            <img src="${product.image}" alt="${product.name}">
                        </a>
                    </div>
                    <div class="product-info">
                        <a href="product-detail.html?id=${product.id}" class="product-link"><h3>${product.name}</h3></a>
                        <p class="price">${formatCurrency(product.price)}</p>
                    </div>
                    <button class="add-to-cart-btn" title="Thêm vào giỏ"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                `;
                productGrid.appendChild(productCard);
            });
        } else {
            productGrid.innerHTML = '<p>Không có sản phẩm nào phù hợp.</p>';
        }

        // 4. Hiển thị các nút chia trang
        setupPagination(totalPages);
        if (isProductPage) {
            setupPagination(totalPages);
        }

        // 5. Gắn lại sự kiện cho các nút "Thêm vào giỏ" vừa tạo
        document.querySelectorAll('.product-grid .add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = button.closest('.product-card');
                const productToAdd = allProducts.find(p => p.id === card.dataset.id);
                if (productToAdd) {
                    // Khi thêm từ danh sách, mặc định size 'S' và số lượng 1
                    addToCart(productToAdd, 'S', 1); 
                    flyToCartEffect(e);
                }
            });
        });
    }

    function setupPagination(totalPages) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                displayProducts();
            });
            paginationContainer.appendChild(pageBtn);
        }
    }

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                document.querySelector('.filter-btn.active').classList.remove('active');
                button.classList.add('active');
                currentFilter = button.dataset.filter;
                currentPage = 1; // Reset về trang 1 khi lọc
                displayProducts();
            });
        });
    }

    // Gắn sự kiện cho ô tìm kiếm
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Ngăn trang tải lại
            searchTerm = searchInput.value;
            currentPage = 1; // Reset về trang 1 khi tìm kiếm
            displayProducts();
        });
    }

    // --- Logic cho Nút Cuộn Lên Đầu Trang ---
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top-btn';
    scrollTopBtn.setAttribute('title', 'Cuộn lên đầu trang');
    scrollTopBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
    `;
    document.body.appendChild(scrollTopBtn);

    // Hiển thị/ẩn nút khi cuộn
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Hiển thị nút khi cuộn xuống 300px
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Sự kiện click để cuộn lên đầu trang
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ // Sử dụng phương thức scrollTo với tùy chọn behavior
            top: 0,
            behavior: 'smooth' // Tạo hiệu ứng cuộn mượt
        });
    });

    // --- Chạy các hàm khởi tạo ---
    updateCartCount(); // Cập nhật số lượng giỏ hàng khi tải trang
    renderCartItems(); // Hiển thị các sản phẩm nếu đang ở trang giỏ hàng
    renderCheckoutPage(); // Hiển thị và xử lý trang checkout
    renderProductDetail(); // Hiển thị chi tiết sản phẩm
    displayProducts(); // Hiển thị sản phẩm cho trang products.html và index.html (nếu có)
    setupFormValidation(); // Thêm hàm khởi tạo xác thực form
});
