// GitHub Pagesの静的サイトで動作するように、ダミーデータとクライアントサイドのロジックで実装
document.addEventListener('DOMContentLoaded', () => {
    // --- ページ切り替え機能 ---
    const pages = document.querySelectorAll('.page');
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.currentTarget.dataset.page;
            
            // 全てのページとメニューアイテムを非アクティブ化
            pages.forEach(page => page.classList.remove('active'));
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            
            // 選択されたページとメニューアイテムをアクティブ化
            document.getElementById(`${pageId}-page`).classList.add('active');
            e.currentTarget.classList.add('active');
        });
    });

    // --- ダミーデータ ---
    const DUMMY_ITEMS = [
        { id: 'item1', name: 'シャツ', price: '¥11,000', imageUrl: 'img/item1.png', category: 'tops', isFavorite: false },
        { id: 'item2', name: 'スウェット', price: '¥13,500', imageUrl: 'img/item2.png', category: 'tops', isFavorite: false },
        { id: 'item3', name: 'Tシャツ&サスペンダー', price: '¥11,000', imageUrl: 'img/item3.png', category: 'tops', isFavorite: false },
        { id: 'item4', name: 'パーカー', price: '¥9,000', imageUrl: 'img/item4.png', category: 'tops', isFavorite: false },
        { id: 'item5', name: 'ジャケット', price: '¥15,000', imageUrl: 'img/item5.png', category: 'tops', isFavorite: false },
        { id: 'item6', name: 'ブルゾン', price: '¥12,500', imageUrl: 'img/item6.png', category: 'tops', isFavorite: false },
        { id: 'item7', name: 'Tシャツ', price: '¥7,000', imageUrl: 'img/item7.png', category: 'tops', isFavorite: false },
        { id: 'item8', name: 'スウェット', price: '¥13,000', imageUrl: 'img/item8.png', category: 'tops', isFavorite: false },
        { id: 'item9', name: 'サスペンダー付きズボン', price: '¥11,000', imageUrl: 'img/item9.png', category: 'bottoms', isFavorite: false },
        { id: 'item10', name: 'デニム', price: '¥12,000', imageUrl: 'img/item10.png', category: 'bottoms', isFavorite: false },
        { id: 'item11', name: 'パンツ', price: '¥9,500', imageUrl: 'img/item11.png', category: 'bottoms', isFavorite: false },
        { id: 'item12', name: 'チノパン', price: '¥8,500', imageUrl: 'img/item12.png', category: 'bottoms', isFavorite: false },
        { id: 'item13', name: 'ショートパンツ', price: '¥7,000', imageUrl: 'img/item13.png', category: 'bottoms', isFavorite: false },
        { id: 'item14', name: '革靴', price: '¥18,000', imageUrl: 'img/item14.png', category: 'shoes', isFavorite: false },
        { id: 'item15', name: 'スニーカー', price: '¥12,000', imageUrl: 'img/item15.png', category: 'shoes', isFavorite: false },
        { id: 'item16', name: 'ブーツ', price: '¥22,000', imageUrl: 'img/item16.png', category: 'shoes', isFavorite: false }
    ];

    const DUMMY_FRIENDS = [
        { id: 'friend1', name: '山田 太郎', avatarUrl: 'img/friend_avatar1.png' },
        { id: 'friend2', name: '佐藤 花子', avatarUrl: 'img/friend_avatar2.png' },
        { id: 'friend3', name: '鈴木 健', avatarUrl: 'img/friend_avatar3.png' }
    ];

    let DUMMY_POSTS = [
        {
            id: 'post1',
            username: '田中 宏',
            userId: '@tanaka_h',
            avatar: 'img/friend_avatar4.png',
            caption: '新作のシャツで街ブラ！今日の天気も最高でした✨ #今日のコーデ #メンズファッション',
            images: ['img/post1_1.png', 'img/post1_2.png'],
            likes: 125,
            comments: 15
        },
        {
            id: 'post2',
            username: '山本 さやか',
            userId: '@sayaka_y',
            avatar: 'img/friend_avatar5.png',
            caption: 'お気に入りの古着とスニーカー👟 涼しくなってきて嬉しいな！',
            images: ['img/post2_1.png'],
            likes: 80,
            comments: 8
        },
        {
            id: 'post3',
            username: '斎藤 ゆうき',
            userId: '@yuki_s',
            avatar: 'img/friend_avatar6.png',
            caption: '新しいジャケット、着心地最高！',
            images: ['img/post3_1.png'],
            likes: 45,
            comments: 3
        }
    ];

    const DUMMY_SHARED_ITEMS = [
        {
            id: 'shared1',
            fromUser: '佐藤 花子',
            fromAvatar: 'img/friend_avatar2.png',
            date: '2025/09/20',
            item: { name: 'ストライプシャツ', price: '¥8,500', imageUrl: 'img/shared_item1.png' }
        },
        {
            id: 'shared2',
            fromUser: '鈴木 健',
            fromAvatar: 'img/friend_avatar3.png',
            date: '2025/09/18',
            item: { name: 'ワイドパンツ', price: '¥9,200', imageUrl: 'img/shared_item2.png' }
        }
    ];

    let DUMMY_EVENTS = [
        { id: 1, title: 'ファッションショー', date: '2025-10-25', time: '14:00' },
        { id: 2, title: '古着市', date: '2025-10-18', time: '11:00' }
    ];

    // --- サーチ画面の機能 ---
    const itemGrid = document.getElementById('item-grid');
    const searchBar = document.getElementById('search-bar');

    function renderItems(items) {
        itemGrid.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('item-card');
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="item-image">
                <span class="material-icons favorite-icon ${item.isFavorite ? 'favorited' : ''}" data-item-id="${item.id}">favorite</span>
                <div class="item-details">
                    <p class="item-name">${item.name}</p>
                    <p class="item-price">${item.price}</p>
                </div>
                <button class="send-to-friend-btn" data-item-id="${item.id}">友人に送信</button>
            `;
            itemGrid.appendChild(card);
        });
    }

    // お気に入り機能
    itemGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('favorite-icon')) {
            const itemId = e.target.dataset.itemId;
            const item = DUMMY_ITEMS.find(i => i.id === itemId);
            if (item) {
                item.isFavorite = !item.isFavorite;
                e.target.classList.toggle('favorited');
                renderFavorites(); // ホーム画面のお気に入りを更新
            }
        }
    });

    // 検索機能
    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredItems = DUMMY_ITEMS.filter(item => 
            item.name.toLowerCase().includes(query)
        );
        renderItems(filteredItems);
    });

    // --- ホーム画面のお気に入り表示 ---
    const favoritesGrid = document.getElementById('favorites-grid');
    function renderFavorites() {
        favoritesGrid.innerHTML = '';
        const favoriteItems = DUMMY_ITEMS.filter(item => item.isFavorite).slice(0, 4); // 最初の4件のみ表示
        favoriteItems.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('item-card');
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <p class="item-name">${item.name}</p>
                    <p class="item-price">${item.price}</p>
                </div>
            `;
            favoritesGrid.appendChild(card);
        });
    }

    // --- プロフィール画面の機能 ---
    const usernameInput = document.getElementById('username-input');
    const editIcon = document.querySelector('.edit-icon');

    editIcon.addEventListener('click', () => {
        usernameInput.readOnly = false;
        usernameInput.focus();
    });

    usernameInput.addEventListener('blur', () => {
        usernameInput.readOnly = true;
    });

    // --- 友人へ送信モーダル ---
    const friendModal = document.getElementById('friend-modal');
    const friendList = document.getElementById('friend-list');
    let selectedItemId = null;

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('send-to-friend-btn')) {
            selectedItemId = e.target.dataset.itemId;
            friendModal.classList.remove('hidden');
            renderFriendList();
        }
    });

    document.getElementById('friend-modal').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-close') || e.target.id === 'friend-modal') {
            friendModal.classList.add('hidden');
        }
    });

    function renderFriendList() {
        friendList.innerHTML = '';
        DUMMY_FRIENDS.forEach(friend => {
            const friendItem = document.createElement('div');
            friendItem.classList.add('friend-item');
            friendItem.innerHTML = `
                <img src="${friend.avatarUrl}" alt="${friend.name}のアバター" class="friend-avatar">
                <p class="friend-name">${friend.name}</p>
            `;
            friendList.appendChild(friendItem);
        });
    }

    // --- タイムライン機能 ---
    const postModal = document.getElementById('post-modal');
    const postButton = document.getElementById('post-button');
    const postModalClose = document.getElementById('post-modal-close');
    const timelineContainer = document.getElementById('timeline-container');
    const postImageUpload = document.getElementById('post-image-upload');
    const postPreviewContainer = document.getElementById('post-preview-container');
    const postCaption = document.getElementById('post-caption');
    const submitPostButton = document.getElementById('submit-post-button');

    postButton.addEventListener('click', () => postModal.classList.remove('hidden'));
    postModalClose.addEventListener('click', () => postModal.classList.add('hidden'));

    let uploadedImages = [];

    postImageUpload.addEventListener('change', (e) => {
        uploadedImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
        renderPostPreviews();
    });

    function renderPostPreviews() {
        postPreviewContainer.innerHTML = '';
        uploadedImages.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.classList.add('preview-image');
            postPreviewContainer.appendChild(img);
        });
    }

    submitPostButton.addEventListener('click', () => {
        const newPost = {
            id: `post${DUMMY_POSTS.length + 1}`,
            username: 'ユーザー名',
            userId: '@dummy_user',
            avatar: 'img/avatar_placeholder.png',
            caption: postCaption.value,
            images: uploadedImages,
            likes: 0,
            comments: 0
        };
        DUMMY_POSTS.unshift(newPost);
        renderTimeline();
        postModal.classList.add('hidden');
        postCaption.value = '';
        postPreviewContainer.innerHTML = '';
        uploadedImages = [];
    });
    
    // タイムライン投稿表示
    function renderTimeline() {
        timelineContainer.innerHTML = '';
        DUMMY_POSTS.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');
            postCard.innerHTML = `
                <div class="post-header">
                    <img src="${post.avatar}" alt="${post.username}のアバター" class="post-avatar">
                    <div class="post-user-info">
                        <p class="post-username">${post.username}</p>
                        <p class="post-id">${post.userId}</p>
                    </div>
                </div>
                <div class="post-body">
                    <p>${post.caption}</p>
                    <div class="post-image-container">
                        ${post.images.map(imgSrc => `<img src="${imgSrc}" alt="投稿画像" class="post-image">`).join('')}
                    </div>
                </div>
                <div class="post-actions">
                    <span class="material-icons">favorite_border</span>
                    <span class="material-icons">chat_bubble_outline</span>
                    <span class="material-icons">share</span>
                </div>
            `;
            timelineContainer.appendChild(postCard);
        });
    }

    // --- シェアクローゼット機能 ---
    const sharedWithContainer = document.getElementById('shared-with-container');
    const sharedByContainer = document.getElementById('shared-by-container');

    function renderSharedItems() {
        sharedWithContainer.innerHTML = '';
        DUMMY_SHARED_ITEMS.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('shared-item-card');
            card.innerHTML = `
                <div class="shared-item-header">
                    <img src="${item.fromAvatar}" alt="${item.fromUser}のアバター" class="shared-item-avatar">
                    <div class="shared-item-info">
                        <p class="shared-from-name">from: ${item.fromUser}</p>
                        <p class="shared-date">${item.date}</p>
                    </div>
                </div>
                <img src="${item.item.imageUrl}" alt="${item.item.name}" class="shared-item-image">
                <div class="shared-item-details">
                    <p class="shared-item-name">${item.item.name}</p>
                    <p class="shared-item-price">${item.item.price}</p>
                </div>
            `;
            sharedWithContainer.appendChild(card);
        });
    }

    // --- 試着機能 ---
    const tryOnTabs = document.querySelectorAll('.try-on-tab');
    const itemSelectionGrid = document.querySelector('.item-selection-grid');
    const tryOnTops = document.getElementById('try-on-tops');
    const tryOnBottoms = document.getElementById('try-on-bottoms');
    const tryOnShoes = document.getElementById('try-on-shoes');

    let currentCategory = 'tops';

    tryOnTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tryOnTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            renderTryOnItems(currentCategory);
        });
    });

    function renderTryOnItems(category) {
        itemSelectionGrid.innerHTML = '';
        const filteredItems = DUMMY_ITEMS.filter(item => item.category === category);
        filteredItems.forEach(item => {
            const img = document.createElement('img');
            img.src = item.imageUrl;
            img.alt = item.name;
            img.classList.add('try-on-thumbnail');
            img.dataset.itemId = item.id;
            itemSelectionGrid.appendChild(img);
        });
    }

    itemSelectionGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('try-on-thumbnail')) {
            const imageUrl = e.target.src;
            if (currentCategory === 'tops') {
                tryOnTops.src = imageUrl;
            } else if (currentCategory === 'bottoms') {
                tryOnBottoms.src = imageUrl;
            } else if (currentCategory === 'shoes') {
                tryOnShoes.src = imageUrl;
            }
        }
    });

    // --- リアルイベント機能 ---
    const calendarDates = document.getElementById('calendar-dates');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const eventList = document.getElementById('event-list');
    const eventModal = document.getElementById('event-modal');
    const addEventButton = document.getElementById('add-event-button');
    const eventModalClose = document.getElementById('event-modal-close');
    const saveEventButton = document.getElementById('save-event-button');
    const eventTitleInput = document.getElementById('event-title-input');
    const eventDateInput = document.getElementById('event-date-input');
    const eventTimeInput = document.getElementById('event-time-input');

    let currentDate = new Date();
    let selectedDate = null;

    function renderCalendar() {
        calendarDates.innerHTML = '';
        currentMonthYear.textContent = `${currentDate.getFullYear()}年 ${currentDate.getMonth() + 1}月`;

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day', 'empty');
            calendarDates.appendChild(emptyDay);
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            day.textContent = i;
            day.dataset.date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
            
            const event = DUMMY_EVENTS.find(e => e.date === day.dataset.date);
            if (event) {
                const eventDot = document.createElement('div');
                eventDot.classList.add('event-dot');
                day.appendChild(eventDot);
            }

            day.addEventListener('click', () => {
                document.querySelectorAll('.day').forEach(d => d.classList.remove('active'));
                day.classList.add('active');
                selectedDate = day.dataset.date;
                renderEventList(selectedDate);
            });
            calendarDates.appendChild(day);
        }
    }
    
    function renderEventList(date) {
        eventList.innerHTML = '';
        const events = DUMMY_EVENTS.filter(e => e.date === date);
        if (events.length > 0) {
            events.forEach(event => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${event.title}</strong><br>${event.time}`;
                eventList.appendChild(li);
            });
        } else {
            eventList.innerHTML = '<li>予定はありません</li>';
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    addEventButton.addEventListener('click', () => {
        if (selectedDate) {
            eventDateInput.value = selectedDate;
        }
        eventModal.classList.remove('hidden');
    });

    eventModalClose.addEventListener('click', () => {
        eventModal.classList.add('hidden');
    });

    saveEventButton.addEventListener('click', () => {
        const newEvent = {
            id: DUMMY_EVENTS.length + 1,
            title: eventTitleInput.value,
            date: eventDateInput.value,
            time: eventTimeInput.value
        };
        if (newEvent.title && newEvent.date) {
            DUMMY_EVENTS.push(newEvent);
            eventModal.classList.add('hidden');
            eventTitleInput.value = '';
            eventDateInput.value = '';
            eventTimeInput.value = '';
            renderCalendar();
            if (selectedDate) {
                renderEventList(selectedDate);
            }
        }
    });

    // --- 初期表示 ---
    renderItems(DUMMY_ITEMS);
    renderFavorites();
    renderTimeline();
    renderSharedItems();
    renderTryOnItems('tops');
    renderCalendar();
    renderEventList(null);
});