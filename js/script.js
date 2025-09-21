document.addEventListener('DOMContentLoaded', () => {
    const itemGrid = document.getElementById('item-grid');
    const searchBar = document.getElementById('search-bar');
    const friendModal = document.getElementById('friend-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const friendListContainer = document.getElementById('friend-list');
    
    // 新しい画面切り替え用の要素
    const menuItems = document.querySelectorAll('.menu-item');
    const pages = document.querySelectorAll('.page');
    const favoritesGrid = document.getElementById('favorites-grid');
    const allFavoritesGrid = document.getElementById('all-favorites-grid');
    
    // ホーム画面の新しい要素
    const iconUpload = document.getElementById('icon-upload');
    const currentIcon = document.getElementById('current-icon');
    const usernameInput = document.getElementById('username-input');
    const editIcon = document.querySelector('.edit-icon');

    // タイムライン画面の要素
    const timelineContainer = document.getElementById('timeline-container');
    const timelineTabs = document.querySelectorAll('.timeline-tab');
    const postButton = document.getElementById('post-button');
    const postModal = document.getElementById('post-modal');
    const postModalClose = document.getElementById('post-modal-close');
    const postCaptionInput = document.getElementById('post-caption');
    const postImageUpload = document.getElementById('post-image-upload');
    const postPreviewContainer = document.getElementById('post-preview-container');
    const submitPostButton = document.getElementById('submit-post-button');
    
    // シェアクローゼットの要素
    const sharedWithContainer = document.getElementById('shared-with-container');
    const sharedByContainer = document.getElementById('shared-by-container');
    const shareClosetTabs = document.querySelectorAll('.share-closet-tab');

    // 画像拡大モーダルの要素
    const imageModal = document.getElementById('image-modal');
    const imageModalClose = document.getElementById('image-modal-close');
    const modalImage = document.getElementById('modal-image');

    // 試着機能の要素
    const tryOnTabs = document.querySelectorAll('.try-on-tab');
    const itemSelectionGrid = document.querySelector('.item-selection-grid');
    const tryOnTops = document.getElementById('try-on-tops');
    const tryOnBottoms = document.getElementById('try-on-bottoms');
    const tryOnShoes = document.getElementById('try-on-shoes');

    // リアルイベント機能の要素
    const calendarDates = document.getElementById('calendar-dates');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const addEventButton = document.getElementById('add-event-button');
    const eventModal = document.getElementById('event-modal');
    const eventModalClose = document.getElementById('event-modal-close');
    const eventTitleInput = document.getElementById('event-title-input');
    const eventDateInput = document.getElementById('event-date-input');
    const eventTimeInput = document.getElementById('event-time-input');
    const saveEventButton = document.getElementById('save-event-button');
    const eventList = document.getElementById('event-list');
    
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let selectedDate = new Date(); // 今日の日付を初期値に
    
    // ダミーのイベントデータ（実際にはバックエンドから取得）
    let events = {}; // { 'YYYY-MM-DD': [{ title, time }] }

    // 友人リストのダミーデータ
    const dummyFriends = [
        { name: '山田', avatar: 'img/avatar_placeholder.png' },
        { name: '田中', avatar: 'img/avatar_placeholder.png' },
        { name: '佐藤', avatar: 'img/avatar_placeholder.png' },
        { name: '鈴木', avatar: 'img/avatar_placeholder.png' }
    ];
    
    // 全アイテムデータの配列
    const allDummyItems = [
        { name: 'Tシャツ', price: '¥11,000', imageUrl: 'img/item1.png', id: 'item1', category: 'tops' },
        { name: 'スウェット', price: '¥13,200', imageUrl: 'img/item2.png', id: 'item2', category: 'tops' },
        { name: 'Tシャツ/カットソー', price: '¥11,000', imageUrl: 'img/item3.png', id: 'item3', category: 'tops' },
        { name: 'フーディー', price: '¥9,800', imageUrl: 'img/item4.png', id: 'item4', category: 'tops' },
        { name: 'ジャケット', price: '¥15,000', imageUrl: 'img/item5.png', id: 'item5', category: 'tops' },
        { name: 'ブルゾン', price: '¥12,500', imageUrl: 'img/item6.png', id: 'item6', category: 'tops' },
        { name: 'Tシャツ', price: '¥11,000', imageUrl: 'img/item7.png', id: 'item7', category: 'tops' },
        { name: 'スウェット', price: '¥13,200', imageUrl: 'img/item8.png', id: 'item8', category: 'bottoms' },
        { name: 'Tシャツ/カットソー', price: '¥11,000', imageUrl: 'img/item9.png', id: 'item9', category: 'bottoms' },
        { name: 'フーディー', price: '¥9,800', imageUrl: 'img/item10.png', id: 'item10', category: 'shoes' },
        { name: 'ジャケット', price: '¥15,000', imageUrl: 'img/item11.png', id: 'item11', category: 'shoes' },
        { name: 'ブルゾン', price: '¥12,500', imageUrl: 'img/item12.png', id: 'item12', category: 'shoes' },
        { name: 'Tシャツ', price: '¥11,000', imageUrl: 'img/item13.png', id: 'item13', category: 'shoes' },
        { name: 'スウェット', price: '¥13,200', imageUrl: 'img/item14.png', id: 'item14', category: 'tops' },
        { name: 'Tシャツ/カットソー', price: '¥11,000', imageUrl: 'img/item15.png', id: 'item15', category: 'bottoms' },
    ];
    
    let favoriteItems = [];
    let sharedWithItems = [ // ダミーの「シェアされた」アイテム
        { name: 'フーディー', price: '¥9,800', imageUrl: 'img/item4.png', id: 'item4', sharerName: '山田', sharerAvatar: 'img/avatar_placeholder.png', date: '2025/9/19' },
        { name: 'ジャケット', price: '¥15,000', imageUrl: 'img/item5.png', id: 'item5', sharerName: '田中', sharerAvatar: 'img/avatar_placeholder.png', date: '2025/9/18' }
    ]; 
    let sharedByItems = [];   // 「シェアした」アイテム

    // ダミーの投稿データ
    let dummyPosts = [
        { user: '田中', userId: '@tanaka_01', images: ['img/timeline1.png'], caption: '今日のコーデです！古着のスウェットがお気に入り。', likes: 125, comments: 5 },
        { user: '山田', userId: '@yamada_02', images: ['img/timeline2.png', 'img/timeline3.png'], caption: '最近買ったジャケット、めちゃくちゃ形がいい。', likes: 88, comments: 2 },
        { user: '佐藤', userId: '@sato_03', images: ['img/timeline3.png', 'img/timeline1.png', 'img/timeline2.png'], caption: 'このスニーカー、どんな服に合わせようか迷うなぁ。', likes: 201, comments: 10 }
    ];

    function renderItems(items, gridElement, isFavoritePage = false) {
        gridElement.innerHTML = '';
        items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';

            const isFavorited = favoriteItems.some(fav => fav.id === item.id);
            const favIconClass = isFavorited ? 'favorite' : 'favorite_border';
            const favIconColorClass = isFavorited ? 'favorited' : '';

            itemCard.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <p class="item-name">${item.name}</p>
                    <p class="item-price">${item.price}</p>
                </div>
                <span class="favorite-icon material-icons ${favIconColorClass}" data-item-id="${item.id}">${favIconClass}</span>
                ${isFavoritePage ? '' : '<div class="send-to-friend-btn">styLink!</div>'}
            `;
            gridElement.appendChild(itemCard);

            const sendBtn = itemCard.querySelector('.send-to-friend-btn');
            if (sendBtn) {
                sendBtn.addEventListener('click', () => {
                    friendModal.classList.remove('hidden');
                    // どのアイテムが選択されたかをモーダルに渡す
                    friendModal.dataset.selectedItemId = item.id;
                });
            }

            const favIcon = itemCard.querySelector('.favorite-icon');
            favIcon.addEventListener('click', () => {
                toggleFavorite(item);
            });
        });
    }
    
    // 試着機能用のアイテムをレンダリングする関数
    function renderTryOnItems(category) {
        itemSelectionGrid.innerHTML = '';
        const itemsToDisplay = allDummyItems.filter(item => item.category === category);
        
        itemsToDisplay.forEach(item => {
            const thumbnail = document.createElement('img');
            thumbnail.src = item.imageUrl;
            thumbnail.alt = item.name;
            thumbnail.className = 'try-on-thumbnail';
            thumbnail.dataset.imageUrl = item.imageUrl;
            
            thumbnail.addEventListener('click', () => {
                switch (category) {
                    case 'tops':
                        tryOnTops.src = item.imageUrl;
                        break;
                    case 'bottoms':
                        tryOnBottoms.src = item.imageUrl;
                        break;
                    case 'shoes':
                        tryOnShoes.src = item.imageUrl;
                        break;
                }
            });
            
            itemSelectionGrid.appendChild(thumbnail);
        });
    }

    // カレンダーをレンダリングする関数
    function renderCalendar(month, year) {
        calendarDates.innerHTML = '';
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startingDay = firstDay.getDay();

        currentMonthYear.textContent = `${year}年 ${month + 1}月`;

        // 前月の日付
        for (let i = 0; i < startingDay; i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'day empty';
            calendarDates.appendChild(dayCell);
        }

        // 今月の日付
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'day';
            dayCell.textContent = i;
            
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            dayCell.dataset.date = dateString;

            // 今日の日付にactiveクラスを追加
            const today = new Date();
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayCell.classList.add('active');
            }

            // イベントがある日にドットを表示
            if (events[dateString] && events[dateString].length > 0) {
                const eventDot = document.createElement('span');
                eventDot.className = 'event-dot';
                dayCell.appendChild(eventDot);
            }
            
            dayCell.addEventListener('click', (e) => {
                document.querySelectorAll('.day').forEach(d => d.classList.remove('active'));
                e.currentTarget.classList.add('active');
                selectedDate = new Date(year, month, i);
                renderEvents(dateString);
            });
            calendarDates.appendChild(dayCell);
        }
    }
    
    // イベントリストをレンダリングする関数
    function renderEvents(dateString) {
        eventList.innerHTML = '';
        const todaysEvents = events[dateString] || [];
        
        if (todaysEvents.length === 0) {
            const li = document.createElement('li');
            li.textContent = '予定はありません。';
            li.className = 'no-events';
            eventList.appendChild(li);
        } else {
            todaysEvents.forEach(event => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${event.title}</strong><br><small>${event.time}</small>`;
                eventList.appendChild(li);
            });
        }
    }

    function renderTimeline(posts) {
        timelineContainer.innerHTML = '';
        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';

            // 投稿画像のHTMLを生成
            const imageHtml = post.images.length > 0
                ? `<div class="post-image-container">
                    ${post.images.map(img => `<img src="${img}" alt="投稿画像" class="timeline-post-image">`).join('')}
                   </div>`
                : '';

            postCard.innerHTML = `
                <div class="post-header">
                    <img src="img/avatar_placeholder.png" alt="${post.user}のアバター" class="post-avatar">
                    <div class="post-user-info">
                        <p class="post-username">${post.user}</p>
                        <p class="post-id">${post.userId}</p>
                    </div>
                </div>
                <div class="post-body">
                    <p>${post.caption}</p>
                    ${imageHtml}
                </div>
                <div class="post-actions">
                    <div class="action-item"><span class="material-icons">favorite_border</span> ${post.likes}</div>
                    <div class="action-item"><span class="material-icons">chat_bubble_outline</span> ${post.comments}</div>
                    <div class="action-item"><span class="material-icons">share</span></div>
                </div>
            `;
            timelineContainer.prepend(postCard); // 新しい投稿を一番上に表示

            // 画像クリックで拡大表示
            const postImages = postCard.querySelectorAll('.timeline-post-image');
            postImages.forEach(img => {
                img.addEventListener('click', (e) => {
                    modalImage.src = e.target.src;
                    imageModal.classList.remove('hidden');
                });
            });
        });
    }

    // 新しい関数: シェアされたアイテムをレンダリング
    function renderSharedItems(items, container, isSharedBy = false) {
        container.innerHTML = '';
        if (items.length === 0) {
            const message = isSharedBy ? 'まだアイテムをシェアしていません。' : 'まだシェアされたアイテムはありません。';
            container.innerHTML = `<p style="text-align: center; margin-top: 50px; color: #777;">${message}</p>`;
        } else {
            items.forEach(item => {
                const sharedCard = document.createElement('div');
                sharedCard.className = 'shared-item-card';

                const headerText = isSharedBy 
                    ? `<span>${item.sharerName}さんにシェアしました</span>`
                    : `<span>${item.sharerName}さんからシェアされました</span>`;

                sharedCard.innerHTML = `
                    <div class="shared-item-header">
                        <img src="${item.sharerAvatar}" alt="${item.sharerName}のアバター" class="shared-item-avatar">
                        <div class="shared-item-info">
                            <p class="shared-from-name">${headerText}</p>
                            <p class="shared-date">${item.date}</p>
                        </div>
                    </div>
                    <img src="${item.imageUrl}" alt="${item.name}" class="shared-item-image">
                    <div class="shared-item-details">
                        <p class="shared-item-name">${item.name}</p>
                        <p class="shared-item-price">${item.price}</p>
                    </div>
                `;
                container.appendChild(sharedCard);
            });
        }
    }


    function toggleFavorite(item) {
        const index = favoriteItems.findIndex(fav => fav.id === item.id);
        if (index > -1) {
            favoriteItems.splice(index, 1);
        } else {
            favoriteItems.push(item);
        }
        updateFavorites();
    }
    
    function updateFavorites() {
        const homeFavs = favoriteItems.slice(0, 4);
        renderItems(homeFavs, favoritesGrid);
        renderItems(favoriteItems, allFavoritesGrid, true);
        renderItems(allDummyItems, itemGrid);
    }
    
    updateFavorites();
    renderItems(allDummyItems, itemGrid);

    if (searchBar) {
        searchBar.addEventListener('input', () => {
            const query = searchBar.value.toLowerCase();
            const filteredItems = allDummyItems.filter(item => 
                item.name.toLowerCase().includes(query)
            );
            renderItems(filteredItems, itemGrid);
        });
    }

    dummyFriends.forEach(friend => {
        const friendItem = document.createElement('div');
        friendItem.className = 'friend-item';
        friendItem.innerHTML = `
            <img src="${friend.avatar}" alt="${friend.name}のアバター" class="friend-avatar">
            <span class="friend-name">${friend.name}</span>
        `;
        friendListContainer.appendChild(friendItem);

        friendItem.addEventListener('click', () => {
            const selectedItemId = friendModal.dataset.selectedItemId;
            const selectedItem = allDummyItems.find(item => item.id === selectedItemId);
            
            if (selectedItem) {
                const now = new Date();
                const formattedDate = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
                
                // ここで「シェアしたアイテム」として追加
                const sharedByItem = {
                    ...selectedItem,
                    sharerName: friend.name,
                    sharerAvatar: friend.avatar,
                    date: formattedDate
                };
                sharedByItems.unshift(sharedByItem);
                
                alert(`${friend.name}さんにアイテムを送信しました！`);
            }
            friendModal.classList.add('hidden');
        });
    });

    modalCloseBtn.addEventListener('click', () => {
        friendModal.classList.add('hidden');
    });

    friendModal.addEventListener('click', (e) => {
        if (e.target === friendModal) {
            friendModal.classList.add('hidden');
        }
    });
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = e.currentTarget.getAttribute('data-page');
            
            pages.forEach(page => {
                const pageId = page.id.replace('-page', '');
                if (pageId === targetPage) {
                    page.classList.add('active');
                    page.classList.remove('hidden');
                } else {
                    page.classList.remove('active');
                    page.classList.add('hidden');
                }
            });
            // ページ切り替え時の初期化処理
            if (targetPage === 'timeline') {
                renderTimeline(dummyPosts);
            } else if (targetPage === 'share-closet') {
                // シェアクローゼットの初期表示は「シェアされたアイテム」タブ
                document.querySelector('.share-closet-tab[data-tab="shared-with"]').classList.add('active');
                document.querySelector('.share-closet-tab[data-tab="shared-by"]').classList.remove('active');
                sharedWithContainer.classList.add('active');
                sharedByContainer.classList.remove('active');
                renderSharedItems(sharedWithItems, sharedWithContainer);
            } else if (targetPage === 'try-on') {
                // 試着ページの初期表示は「トップス」
                document.querySelector('.try-on-tab[data-category="tops"]').classList.add('active');
                renderTryOnItems('tops');
            } else if (targetPage === 'event') {
                renderCalendar(currentMonth, currentYear);
                const today = new Date();
                const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                renderEvents(dateString);
            }
        });
    });

    document.getElementById('home-page').classList.add('active');
    document.getElementById('home-page').classList.remove('hidden');
    
    // プロフィールアイコンの変更
    if (iconUpload && currentIcon) {
        iconUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    currentIcon.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // ユーザー名の編集
    if (editIcon && usernameInput) {
        editIcon.addEventListener('click', () => {
            usernameInput.removeAttribute('readonly');
            usernameInput.focus();
        });

        usernameInput.addEventListener('blur', (event) => {
            usernameInput.setAttribute('readonly', true);
            const newName = event.target.value || 'ユーザー名';
            document.querySelector('.profile-name').textContent = newName;
        });
        
        usernameInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                usernameInput.blur();
            }
        });
    }

    // タイムラインのタブ切り替え機能
    if (timelineTabs) {
        timelineTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                timelineTabs.forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                const tabType = e.currentTarget.getAttribute('data-tab');
                // 今はダミーデータなので、タブが切り替わっても同じデータを表示します
                if (tabType === 'recommended') {
                    renderTimeline(dummyPosts);
                } else if (tabType === 'following') {
                    renderTimeline(dummyPosts);
                }
            });
        });
    }
    
    // シェアクローゼットのタブ切り替え機能
    if (shareClosetTabs) {
        shareClosetTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                shareClosetTabs.forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                const tabType = e.currentTarget.getAttribute('data-tab');
                if (tabType === 'shared-with') {
                    sharedWithContainer.classList.add('active');
                    sharedByContainer.classList.remove('active');
                    renderSharedItems(sharedWithItems, sharedWithContainer);
                } else if (tabType === 'shared-by') {
                    sharedByContainer.classList.add('active');
                    sharedWithContainer.classList.remove('active');
                    renderSharedItems(sharedByItems, sharedByContainer, true);
                }
            });
        });
    }

    // 試着機能のタブ切り替え
    if (tryOnTabs) {
        tryOnTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                tryOnTabs.forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                const category = e.currentTarget.getAttribute('data-category');
                renderTryOnItems(category);
            });
        });
    }

    // 投稿ボタンのクリックイベント
    if (postButton) {
        postButton.addEventListener('click', () => {
            postModal.classList.remove('hidden');
        });
    }

    // 投稿モーダルの閉じるボタン
    if (postModalClose) {
        postModalClose.addEventListener('click', () => {
            postModal.classList.add('hidden');
        });
    }

    // 投稿画像のプレビュー
    if (postImageUpload) {
        postImageUpload.addEventListener('change', (event) => {
            const files = event.target.files;
            postPreviewContainer.innerHTML = '';

            if (files.length > 3) {
                alert('写真は3枚まで選択できます。');
                postImageUpload.value = '';
                return;
            }

            for (const file of files) {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.alt = 'プレビュー';
                        img.className = 'preview-image';
                        postPreviewContainer.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
    }

    // 投稿ボタンのクリック
    if (submitPostButton) {
        submitPostButton.addEventListener('click', () => {
            const caption = postCaptionInput.value;
            const imageFiles = postImageUpload.files;

            if (!caption && imageFiles.length === 0) {
                alert('投稿内容を入力するか、画像を選択してください。');
                return;
            }
            
            if (imageFiles.length > 3) {
                alert('写真の枚数が多すぎます。');
                return;
            }

            const imageUrls = [];
            for (const file of imageFiles) {
                imageUrls.push(URL.createObjectURL(file));
            }

            const newPost = {
                user: '新しいユーザー',
                userId: '@new_user',
                caption: caption,
                images: imageUrls,
                likes: 0,
                comments: 0
            };
            
            dummyPosts.unshift(newPost); // 新しい投稿を配列の先頭に追加
            renderTimeline(dummyPosts);

            // モーダルを閉じてフォームをリセット
            postModal.classList.add('hidden');
            postCaptionInput.value = '';
            postImageUpload.value = '';
            postPreviewContainer.innerHTML = '';
            
            alert('投稿が完了しました！');
        });
    }
    
    // 画像拡大モーダルの閉じるボタン
    if (imageModalClose) {
        imageModalClose.addEventListener('click', () => {
            imageModal.classList.add('hidden');
        });
    }

    // モーダル外のクリックで閉じる
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.classList.add('hidden');
            }
        });
    }

    // カレンダーの月移動ボタン
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentMonth, currentYear);
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentMonth, currentYear);
        });
    }

    // 予定追加ボタン
    if (addEventButton) {
        addEventButton.addEventListener('click', () => {
            eventModal.classList.remove('hidden');
            const dateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
            eventDateInput.value = dateString;
        });
    }

    // 予定追加モーダルの閉じるボタン
    if (eventModalClose) {
        eventModalClose.addEventListener('click', () => {
            eventModal.classList.add('hidden');
        });
    }

    // 予定保存ボタン
    if (saveEventButton) {
        saveEventButton.addEventListener('click', () => {
            const title = eventTitleInput.value;
            const date = eventDateInput.value;
            const time = eventTimeInput.value;

            if (!title || !date) {
                alert('タイトルと日付を入力してください。');
                return;
            }

            if (!events[date]) {
                events[date] = [];
            }
            events[date].push({ title, time });
            
            eventModal.classList.add('hidden');
            eventTitleInput.value = '';
            eventTimeInput.value = '';
            renderCalendar(currentMonth, currentYear); // カレンダーを再描画してドットを表示
            renderEvents(date); // 選択された日付のイベントリストを更新
            alert('予定が保存されました！');
        });
    }
});