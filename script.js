document.addEventListener('DOMContentLoaded', () => {
    // --- SABİTLER ---
    const WINNING_SET_COUNT = 5;
    const STARTING_HAND_SIZE = 5;
    const CARDS_TO_DRAW = 2;
    const MAX_MOVES_PER_TURN = 3;
    const HAND_LIMIT = 7;
    const SET_SIZES = { brown: 2, lightblue: 3, purple: 3, orange: 3, red: 3, yellow: 3, green: 3, darkblue: 2, grey: 2, black: 4 };
    const RENT_VALUES = { brown: [1, 2], lightblue: [1, 2, 3], purple: [1, 2, 4], orange: [1, 3, 5], red: [2, 3, 6], yellow: [2, 4, 6], green: [2, 4, 7], darkblue: [3, 8], grey: [1, 2], black: [1, 2, 3, 4] };
    const BUILDING_RENT_BONUS = { house: 3, hotel: 4 };

    // --- KART VERİLERİ (Görsellerle Birlikte) ---
    const createCards = (count, cardData) => Array(count).fill(null).map(() => ({ ...cardData, id: Math.random().toString(36).substr(2, 9) }));
    const allCards = [
        ...createCards(6, { name: '1M', value: 1, type: 'money', image: 'money_1.png' }),
        ...createCards(5, { name: '2M', value: 2, type: 'money', image: 'money_2.png' }),
        ...createCards(3, { name: '3M', value: 3, type: 'money', image: 'money_3.png' }),
        ...createCards(3, { name: '4M', value: 4, type: 'money', image: 'money_4.png' }),
        ...createCards(2, { name: '5M', value: 5, type: 'money', image: 'money_5.png' }),
        ...createCards(1, { name: '10M', value: 10, type: 'money', image: 'money_10.png' }),
        { id: Math.random(), name: 'Kahverengi Tapu', value: 1, type: 'property', color: 'brown', image: 'kahverengitapu1.png' }, { id: Math.random(), name: 'Kahverengi Tapu', value: 1, type: 'property', color: 'brown', image: 'kahverengitapu2.png' },
        { id: Math.random(), name: 'Açık Mavi Tapu', value: 1, type: 'property', color: 'lightblue', image: 'mavitapu1.png' }, { id: Math.random(), name: 'Açık Mavi Tapu', value: 1, type: 'property', color: 'lightblue', image: 'mavitapu2.png' }, { id: Math.random(), name: 'Açık Mavi Tapu', value: 1, type: 'property', color: 'lightblue', image: 'mavitapu3.png' },
        { id: Math.random(), name: 'Mor Tapu', value: 2, type: 'property', color: 'purple', image: 'mortapu1.png' }, { id: Math.random(), name: 'Mor Tapu', value: 2, type: 'property', color: 'purple', image: 'mortapu2.png' }, { id: Math.random(), name: 'Mor Tapu', value: 2, type: 'property', color: 'purple', image: 'mortapu3.png' },
        { id: Math.random(), name: 'Turuncu Tapu', value: 2, type: 'property', color: 'orange', image: 'turuncutapu1.png' }, { id: Math.random(), name: 'Turuncu Tapu', value: 2, type: 'property', color: 'orange', image: 'turuncutapu2.png' }, { id: Math.random(), name: 'Turuncu Tapu', value: 2, type: 'property', color: 'orange', image: 'turuncutapu3.png' },
        { id: Math.random(), name: 'Kırmızı Tapu', value: 3, type: 'property', color: 'red', image: 'kirmizitapu1.png' }, { id: Math.random(), name: 'Kırmızı Tapu', value: 3, type: 'property', color: 'red', image: 'kirmizitapu2.png' }, { id: Math.random(), name: 'Kırmızı Tapu', value: 3, type: 'property', color: 'red', image: 'kirmizitapu3.png' },
        { id: Math.random(), name: 'Sarı Tapu', value: 3, type: 'property', color: 'yellow', image: 'saritapu1.png' }, { id: Math.random(), name: 'Sarı Tapu', value: 3, type: 'property', color: 'yellow', image: 'saritapu2.png' }, { id: Math.random(), name: 'Sarı Tapu', value: 3, type: 'property', color: 'yellow', image: 'saritapu3.png' },
        { id: Math.random(), name: 'Yeşil Tapu', value: 4, type: 'property', color: 'green', image: 'yesiltapu1.png' }, { id: Math.random(), name: 'Yeşil Tapu', value: 4, type: 'property', color: 'green', image: 'yesiltapu2.png' }, { id: Math.random(), name: 'Yeşil Tapu', value: 4, type: 'property', color: 'green', image: 'yesiltapu3.png' },
        { id: Math.random(), name: 'Koyu Mavi Tapu', value: 4, type: 'property', color: 'darkblue', image: 'laciverttapu1.png' }, { id: Math.random(), name: 'Koyu Mavi Tapu', value: 4, type: 'property', color: 'darkblue', image: 'laciverttapu2.png' },
        { id: Math.random(), name: 'Gri Tapu', value: 2, type: 'property', color: 'grey', image: 'gritapu1.png' }, { id: Math.random(), name: 'Gri Tapu', value: 2, type: 'property', color: 'grey', image: 'gritapu2.png' },
        { id: Math.random(), name: 'Siyah Tapu', value: 2, type: 'property', color: 'black', image: 'siyahtapu1.png' }, { id: Math.random(), name: 'Siyah Tapu', value: 2, type: 'property', color: 'black', image: 'siyahtapu2.png' }, { id: Math.random(), name: 'Siyah Tapu', value: 2, type: 'property', color: 'black', image: 'siyahtapu3.png' }, { id: Math.random(), name: 'Siyah Tapu', value: 2, type: 'property', color: 'black', image: 'siyahtapu4.png' },
        ...createCards(2, { name: 'Kırmızı-Sarı Joker', value: 3, type: 'property', colors: ['red', 'yellow'], image: 'kırmızı_sarı.png' }),
        ...createCards(2, { name: 'Mor-Turuncu Joker', value: 2, type: 'property', colors: ['purple', 'orange'], image: 'mor_turuncu.png' }),
        ...createCards(1, { name: 'Siyah-Yeşil Joker', value: 4, type: 'property', colors: ['black', 'green'], image: 'siyah_yeşil.png' }),
        ...createCards(1, { name: 'Koyu Mavi-Yeşil Joker', value: 4, type: 'property', colors: ['darkblue', 'green'], image: 'lacivert_yeşil.png' }),
        ...createCards(1, { name: 'Kahverengi-Açık Mavi Joker', value: 1, type: 'property', colors: ['brown', 'lightblue'], image: 'kahverengi_mavi.png' }),
        ...createCards(1, { name: 'Siyah-Gri Joker', value: 2, type: 'property', colors: ['black', 'grey'], image: 'siyah_gritapu1.png' }),
        ...createCards(1, { name: 'Siyah-Açık Mavi Joker', value: 4, type: 'property', colors: ['black', 'lightblue'], image: 'siyah_mavi.png' }),
        ...createCards(2, { name: 'Joker Tapu', value: 0, type: 'property', color: 'wild', isWild: true, image: 'jokertapu.png' }),
        ...createCards(10, { name: 'Tekrar Çek', value: 1, type: 'action', actionType: 'draw_two', image: 'tekrarcek.png' }),
        ...createCards(3, { name: 'Tahsilat', value: 3, type: 'action', actionType: 'debt_collector', image: 'tahsilat.png' }),
        ...createCards(3, { name: 'Doğum Günüm', value: 2, type: 'action', actionType: 'its_my_birthday', image: 'dogumgunum.png' }),
        ...createCards(3, { name: 'Tapu Devri', value: 3, type: 'action', actionType: 'sly_deal', image: 'tapudevri.png' }),
        ...createCards(3, { name: 'Değiş Tokuş', value: 3, type: 'action', actionType: 'forced_deal', image: 'degistokus.png' }),
        ...createCards(2, { name: 'İki Kat Kira', value: 1, type: 'action', actionType: 'double_rent', image: '2katkira.png' }),
        ...createCards(2, { name: 'Haciz', value: 5, type: 'action', actionType: 'deal_breaker', image: 'haciz.png' }),
        ...createCards(3, { name: 'Reddet', value: 4, type: 'action', actionType: 'just_say_no', image: 'reddet.png' }),
        ...createCards(3, { name: 'Ev', value: 3, type: 'action', actionType: 'house', image: 'ev.png' }),
        ...createCards(2, { name: 'Otel', value: 4, type: 'action', actionType: 'hotel', image: 'otel.png' }),
        ...createCards(2, { name: 'Kahverengi-Açık Mavi Kira', value: 1, type: 'action', actionType: 'rent', colors: ['brown', 'lightblue'], image: 'kahverengi_mavi.png' }),
        ...createCards(2, { name: 'Koyu Mavi-Yeşil Kira', value: 1, type: 'action', actionType: 'rent', colors: ['darkblue', 'green'], image: 'lacivert_yeşil.png' }),
        ...createCards(2, { name: 'Turuncu-Mor Kira', value: 1, type: 'action', actionType: 'rent', colors: ['orange', 'purple'], image: 'mor_turuncu.png' }),
        ...createCards(2, { name: 'Siyah-Gri Kira', value: 1, type: 'action', actionType: 'rent', colors: ['black', 'grey'], image: 'siyah_gritapu1.png' }),
        ...createCards(2, { name: 'Sarı-Kırmızı Kira', value: 1, type: 'action', actionType: 'rent', colors: ['yellow', 'red'], image: 'kırmızı_sarı.png' }),
        ...createCards(3, { name: 'Joker Kira', value: 3, type: 'action', actionType: 'rent', isWild: true, image: 'jokertapu.png' }),
    ];
    let gameState = { players: [{ id: 1, name: 'Sen', hand: [], properties: {}, bank: [] }, { id: 2, name: 'Rakip', hand: [], properties: {}, bank: [] }], deck: [], discardPile: [], currentPlayerIndex: 0, movesMadeThisTurn: 0, hasDrawnCards: false, doubleRentActive: false };

    // --- DOM ELEMENTLERİ ---
    const drawPileDiv = document.getElementById('draw-pile'), discardPileDiv = document.getElementById('discard-pile'), playerHandDiv = document.getElementById('player-hand'), opponentHandDiv = document.getElementById('opponent-hand'), playerPropertiesDiv = document.getElementById('player-properties'), opponentPropertiesDiv = document.getElementById('opponent-properties'), playerBankDiv = document.querySelector('#player-area .bank-area .card-area'), opponentBankDiv = document.querySelector('#opponent-area .bank-area .card-area'), endTurnBtn = document.getElementById('end-turn-btn'), notificationArea = document.getElementById('notification-area'), modalBackdrop = document.getElementById('modal-backdrop'), modalTitle = document.getElementById('modal-title'), modalText = document.getElementById('modal-text'), modalInputArea = document.getElementById('modal-input-area'), modalButtons = document.getElementById('modal-buttons');

    // --- MODAL & BİLDİRİM FONKSİYONLARI ---
    const showNotification = (message, duration = 3000) => { const notification = document.createElement('div'); notification.className = 'notification'; notification.textContent = message; notificationArea.appendChild(notification); setTimeout(() => notification.classList.add('show'), 10); setTimeout(() => { notification.classList.remove('show'); setTimeout(() => notificationArea.removeChild(notification), 500); }, duration); };
    const showModal = (title, text) => { modalTitle.textContent = title; modalText.textContent = text; modalInputArea.innerHTML = ''; modalButtons.innerHTML = ''; modalBackdrop.classList.remove('hidden'); };
    const hideModal = () => modalBackdrop.classList.add('hidden');
    async function showChoicePrompt(title, text, choices) { showModal(title, text); return new Promise(resolve => { choices.forEach(choice => { const button = document.createElement('button'); button.textContent = choice.text; button.className = choice.class; button.onclick = () => { hideModal(); resolve(choice.value); }; modalButtons.appendChild(button); }); }); }
    async function showCardSelection(title, text, cards, min, max) { showModal(title, text); let selectedCards = []; cards.forEach(card => { const cardEl = createCardElement(card, false); cardEl.onclick = () => { if (selectedCards.includes(card.id)) { selectedCards = selectedCards.filter(id => id !== card.id); cardEl.style.boxShadow = 'none'; } else if (selectedCards.length < max) { selectedCards.push(card.id); cardEl.style.boxShadow = '0 0 15px #007bff'; } }; modalInputArea.appendChild(cardEl); }); return new Promise(resolve => { const confirmBtn = document.createElement('button'); confirmBtn.textContent = 'Onayla'; confirmBtn.className = 'confirm-btn'; confirmBtn.onclick = () => { if (selectedCards.length >= min) { hideModal(); resolve(selectedCards); } else { showNotification(`En az ${min} kart seçmelisiniz.`); } }; modalButtons.appendChild(confirmBtn); const cancelBtn = document.createElement('button'); cancelBtn.textContent = 'İptal'; cancelBtn.className = 'cancel-btn'; cancelBtn.onclick = () => { hideModal(); resolve(null); }; modalButtons.appendChild(cancelBtn); }); }

    // --- OYUN MANTIĞI ---
    const executeMove = async (playFunction) => { const moveSuccessful = await playFunction(); if (moveSuccessful) { gameState.movesMadeThisTurn++; updateUI(); checkWinCondition(gameState.players[gameState.currentPlayerIndex]); } };
    const getPlayer = (id) => gameState.players.find(p => p.id === id);
    const getOpponent = (player) => gameState.players.find(p => p.id !== player.id);
    const findCardIn = (area, cardId) => { for (const key in area) { const cardIndex = area[key].findIndex(c => c.id == cardId); if (cardIndex > -1) return { card: area[key][cardIndex], from: area[key], index: cardIndex }; } return null; };
    const removeCardFrom = (player, cardId) => { let found = findCardIn(player.properties, cardId) || findCardIn({ bank: player.bank }, cardId) || findCardIn({ hand: player.hand }, cardId); if (found) { found.from.splice(found.index, 1); if (found.from.length === 0) { for(const color in player.properties) if(player.properties[color] === found.from) delete player.properties[color]; } return found.card; } return null; };

    async function handleCardInHandClick(event) {
        if (gameState.currentPlayerIndex !== 0) { showNotification("Sıra rakipte!"); return; }
        const cardDiv = event.target.closest('.card');
        if (!cardDiv) return;
        if (!gameState.hasDrawnCards) { showNotification("Oynamadan önce kart çekmelisiniz!"); return; }
        if (gameState.movesMadeThisTurn >= MAX_MOVES_PER_TURN) { showNotification("Bu turda hamle hakkınız bitti."); return; }
        const cardId = cardDiv.dataset.cardId;
        const card = gameState.players[0].hand.find(c => c.id == cardId);
        if (!card) return;

        if (card.type === 'property') { await executeMove(() => playCardAsProperty(card.id)); }
        else if (card.type === 'action') {
            const choice = await showChoicePrompt(card.name, "Bu kartı nasıl oynamak istersin?", [{ text: 'Hamle Yap', value: 'action', class: 'confirm-btn' }, { text: 'Bankaya Koy', value: 'money', class: 'confirm-btn' }, { text: 'İptal', value: null, class: 'cancel-btn' }]);
            if (choice === 'action') { await executeMove(() => playActionCard(card.id)); }
            else if (choice === 'money') { await executeMove(() => playCardAsMoney(card.id)); }
        } else { await executeMove(() => playCardAsMoney(card.id)); }
    }

    async function playCardAsProperty(cardId) {
        const player = getPlayer(gameState.players[gameState.currentPlayerIndex].id);
        const cardIndex = player.hand.findIndex(c => c.id == cardId);
        if (cardIndex === -1) return false;
        const card = player.hand[cardIndex];
        let chosenColor = card.color;
        if (card.isWild || card.colors) {
            const colorOptions = card.isWild ? Object.keys(SET_SIZES) : card.colors;
            const choice = await showChoicePrompt("Renk Seç", "Bu joker kartı hangi renk setine eklemek istersin?", colorOptions.map(c => ({ text: c, value: c, class: 'confirm-btn' })).concat({ text: 'İptal', value: null, class: 'cancel-btn' }));
            if (!choice) return false;
            chosenColor = choice;
        }
        player.hand.splice(cardIndex, 1);
        if (!player.properties[chosenColor]) player.properties[chosenColor] = [];
        player.properties[chosenColor].push(card);
        return true;
    }

    async function playCardAsMoney(cardId) { const player = getPlayer(gameState.players[gameState.currentPlayerIndex].id); const cardIndex = player.hand.findIndex(c => c.id == cardId); if (cardIndex > -1) { player.bank.push(player.hand.splice(cardIndex, 1)[0]); return true; } return false; }

    async function playActionCard(cardId) {
        const player = getPlayer(gameState.players[gameState.currentPlayerIndex].id);
        const card = removeCardFrom(player, cardId);
        if (!card) return false;
        const opponent = getOpponent(player);
        let success = false;
        switch (card.actionType) {
            case 'draw_two': gameState.discardPile.push(card); drawCards(player, 2); success = true; break;
            case 'debt_collector': await requestAction(player, opponent, card, () => collectRent(player, opponent, 5)); success = true; break;
            case 'its_my_birthday': await requestAction(player, opponent, card, () => collectRent(player, opponent, 2)); success = true; break;
            case 'sly_deal': success = await handleSlyDeal(player, opponent, card); break;
            case 'deal_breaker': success = await handleDealBreaker(player, opponent, card); break;
            case 'forced_deal': success = await handleForcedDeal(player, opponent, card); break;
            case 'double_rent': gameState.doubleRentActive = true; showNotification("Sonraki kira ikiye katlandı!"); gameState.discardPile.push(card); success = true; break;
            case 'rent': await handleRentCard(player, card, opponent); success = true; break;
            case 'house': case 'hotel': success = await playBuildingCard(player, card); break;
            default: showNotification(`'${card.name}' henüz implemente edilmedi.`); gameState.discardPile.push(card); success = true; // Still a valid move to discard
        }
        if (!success) player.hand.push(card); // Return card if action failed
        return success;
    }

    async function requestAction(actionPlayer, targetPlayer, actionCard, onConfirm) {
        if (targetPlayer.id === 1) { // Only ask human players
            const justSayNoCard = targetPlayer.hand.find(c => c.actionType === 'just_say_no');
            if (justSayNoCard) {
                const useIt = await showChoicePrompt("Hamle Tespit Edildi!", `'Reddet' kartını kullanmak istiyor musun?`, [{ text: 'Evet, Kullan', value: true, class: 'confirm-btn' }, { text: 'Hayır', value: false, class: 'cancel-btn' }]);
                if (useIt) {
                    removeCardFrom(targetPlayer, justSayNoCard.id);
                    gameState.discardPile.push(justSayNoCard, actionCard);
                    showNotification(`${targetPlayer.name} hamleyi reddetti!`);
                    return;
                }
            }
        }
        gameState.discardPile.push(actionCard);
        await onConfirm();
    }

    const getTargetCards = (player, filterFunc) => { const cards = []; for (const color in player.properties) { if (filterFunc(color)) { player.properties[color].forEach(card => cards.push(card)); } } return cards; };
    async function handleSlyDeal(player, opponent, card) { const targets = getTargetCards(opponent, (color) => !isSetCompleted(opponent, color) && !opponent.properties[color].some(c=>c.type!=='property')); if (targets.length === 0) { showNotification("Rakibin çalınabilecek mülkü yok."); return false; } const choice = await showCardSelection("Tapu Devri", "Rakibinden bir mülk seç.", targets, 1, 1); if (!choice) return false; await requestAction(player, opponent, card, () => { const stolenCard = removeCardFrom(opponent, choice[0]); const newColor = stolenCard.color || (stolenCard.colors ? stolenCard.colors[0] : 'wild'); if (!player.properties[newColor]) player.properties[newColor] = []; player.properties[newColor].push(stolenCard); showNotification(`${stolenCard.name} çalındı!`); }); return true; }
    async function handleDealBreaker(player, opponent, card) { const targetSets = Object.keys(opponent.properties).filter(color => isSetCompleted(opponent, color)); if (targetSets.length === 0) { showNotification("Rakibin çalınabilecek tam seti yok."); return false; } const choice = await showChoicePrompt("Haciz", "Hangi seti çalmak istiyorsun?", targetSets.map(c => ({ text: c, value: c, class: 'confirm-btn' })).concat({ text: 'İptal', value: null, class: 'cancel-btn' })); if (!choice) return false; await requestAction(player, opponent, card, () => { const set = opponent.properties[choice]; delete opponent.properties[choice]; if (!player.properties[choice]) player.properties[choice] = []; player.properties[choice].push(...set); showNotification(`${choice} seti haczedildi!`); }); return true; }
    async function handleForcedDeal(player, opponent, card) { const myTargets = getTargetCards(player, (c) => !isSetCompleted(player, c) && !player.properties[c].some(c=>c.type!=='property')); const oppTargets = getTargetCards(opponent, (c) => !isSetCompleted(opponent, c) && !opponent.properties[c].some(c=>c.type!=='property')); if (myTargets.length === 0 || oppTargets.length === 0) { showNotification("Takas için uygun kart bulunamadı."); return false; } const myChoice = await showCardSelection("Değiş Tokuş (1/2)", "Vereceğin kartı seç.", myTargets, 1, 1); if (!myChoice) return false; const oppChoice = await showCardSelection("Değiş Tokuş (2/2)", "Alacağın kartı seç.", oppTargets, 1, 1); if (!oppChoice) return false; await requestAction(player, opponent, card, () => { const myCard = removeCardFrom(player, myChoice[0]); const oppCard = removeCardFrom(opponent, oppChoice[0]); const myNewColor = myCard.color || (myCard.colors ? myCard.colors[0] : 'wild'); const oppNewColor = oppCard.color || (oppCard.colors ? oppCard.colors[0] : 'wild'); if (!player.properties[oppNewColor]) player.properties[oppNewColor] = []; player.properties[oppNewColor].push(oppCard); if (!opponent.properties[myNewColor]) opponent.properties[myNewColor] = []; opponent.properties[myNewColor].push(myCard); showNotification("Kartlar takas edildi!"); }); return true; }
    async function playBuildingCard(player, card) { const targetSets = Object.keys(player.properties).filter(color => isSetCompleted(player, color)); if (targetSets.length === 0) { showNotification("İnşaat için uygun setin yok."); return false; } const choice = await showChoicePrompt(card.name, "Hangi sete ekleyeceksin?", targetSets.map(c => ({ text: c, value: c, class: 'confirm-btn' })).concat({ text: 'İptal', value: null, class: 'cancel-btn' })); if (!choice) return false; const set = player.properties[choice]; const hasHouse = set.some(c => c.actionType === 'house'); if (card.actionType === 'otel' && !hasHouse) { showNotification("Otel için önce Ev gerekir."); return false; } if (set.some(c => c.actionType === card.actionType)) { showNotification(`Bu sette zaten bir ${card.actionType} var.`); return false; } if(hasHouse && card.actionType==='ev') {showNotification("Bu sete daha fazla ev ekleyemezsin."); return false;} set.push(card); showNotification(`${choice} setine ${card.actionType} eklendi.`); return true; }

    const calculateRent = (player, color) => { const set = player.properties[color]; if (!set) return 0; const propertyCards = set.filter(c => c.type === 'property').length; const baseRent = RENT_VALUES[color]?.[propertyCards - 1] || 0; let buildingRent = 0; if (set.some(c => c.actionType === 'house')) buildingRent += BUILDING_RENT_BONUS.house; if (set.some(c => c.actionType === 'otel')) buildingRent += BUILDING_RENT_BONUS.hotel; return baseRent + buildingRent; };
    async function handleRentCard(player, rentCard, opponent) { const colors = rentCard.isWild ? Object.keys(player.properties) : rentCard.colors; let maxRent = 0, rentColor = ''; if (!colors || colors.length === 0) { showNotification("Kira isteyecek mülkün yok."); gameState.discardPile.push(rentCard); return; } colors.forEach(color => { if (player.properties[color]) { const rent = calculateRent(player, color); if (rent > maxRent) { maxRent = rent; rentColor = color; } } }); if (maxRent > 0) { let rentAmount = maxRent; if (gameState.doubleRentActive) { rentAmount *= 2; gameState.doubleRentActive = false; showNotification("Kira ikiye katlandı!"); } await requestAction(player, opponent, rentCard, () => { showNotification(`${player.name}, ${opponent.name}'den ${rentColor} için ${rentAmount}M kira istiyor.`); collectRent(player, opponent, rentAmount); }); } else { showNotification("Kira isteyecek mülkün yok."); gameState.discardPile.push(rentCard); } }
    function collectRent(collector, payer, amount) { let paidAmount = 0; const payment = []; const assets = [...payer.bank, ...Object.values(payer.properties).flat()].sort((a,b)=>b.value-a.value); while(paidAmount < amount && assets.length > 0) { const card = assets.shift(); const cardValue = card.value || 0; paidAmount += cardValue; removeCardFrom(payer, card.id); collector.bank.push(card); } if(paidAmount>0) showNotification(`${payer.name}, ${collector.name}'e ${paidAmount}M ödedi.`); if(paidAmount<amount) showNotification(`${payer.name}'in yeterli parası yok!`); }
    
    // --- OYUN DÖNGÜSÜ & KURULUM ---
    const isSetCompleted = (player, color) => { const set = player.properties[color]; if (!set) return false; return set.filter(c => c.type === 'property').length >= SET_SIZES[color]; };
    const checkWinCondition = (player) => { let completedSets = 0; for (const color in player.properties) { if (isSetCompleted(player, color)) completedSets++; } if (completedSets >= WINNING_SET_COUNT) { setTimeout(() => { showModal(`${player.name} Kazandı!`, `${WINNING_SET_COUNT} tam set yaptı!`); }, 100); } };
    async function endTurn() { const player = getPlayer(gameState.players[gameState.currentPlayerIndex].id); if (player.hand.length > HAND_LIMIT) { const toDiscardCount = player.hand.length - HAND_LIMIT; const discards = await showCardSelection("El Fazlası Kart", `Lütfen ${toDiscardCount} kart at.`, player.hand, toDiscardCount, toDiscardCount); if(discards) { discards.forEach(id => gameState.discardPile.push(removeCardFrom(player, id))); } else { player.hand.splice(HAND_LIMIT).forEach(c => gameState.discardPile.push(c)); showNotification("Otomatik olarak el fazlası atıldı."); } } gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length; gameState.movesMadeThisTurn = 0; gameState.hasDrawnCards = false; gameState.doubleRentActive = false; showNotification(`Sıra ${getPlayer(gameState.players[gameState.currentPlayerIndex].id).name} oyuncusunda.`); updateUI(); }
    const drawCards = (player, amount) => { for (let i = 0; i < amount; i++) { if (gameState.deck.length === 0) { if (gameState.discardPile.length === 0) { showNotification('Deste ve ıskarta boş!'); break; } gameState.deck = [...gameState.discardPile]; gameState.discardPile = []; shuffleDeck(gameState.deck); showNotification('Deste bitti, ıskarta karıştırıldı.'); } player.hand.push(gameState.deck.pop()); } };
    const createCardElement = (card, isOpponentHand) => { const cardDiv = document.createElement('div'); cardDiv.classList.add('card'); if (card) cardDiv.dataset.cardId = card.id; const img = document.createElement('img'); if (isOpponentHand) { img.src = `assets/card_back.png`; img.alt = "Kart Arkası"; } else if (card && card.image) { img.src = `assets/${card.image}`; img.alt = card.name; } else { img.src = `assets/card_back.png`; img.alt = card.name || "Kart"; } cardDiv.appendChild(img); return cardDiv; };
    const renderProperties = (player, element) => { element.innerHTML = ''; for (const color in player.properties) { const propertySetDiv = document.createElement('div'); propertySetDiv.classList.add('property-set'); if (isSetCompleted(player, color)) propertySetDiv.classList.add('completed-set'); player.properties[color].forEach(card => propertySetDiv.appendChild(createCardElement(card, false))); element.appendChild(propertySetDiv); } };
    const updateUI = () => { [playerHandDiv, opponentHandDiv, playerPropertiesDiv, opponentPropertiesDiv, playerBankDiv, opponentBankDiv].forEach(el => el.innerHTML = ''); drawPileDiv.textContent = `Deste (${gameState.deck.length})`; discardPileDiv.textContent = `Iskarta (${gameState.discardPile.length})`; const player = gameState.players[0]; const opponent = gameState.players[1]; player.hand.forEach(card => playerHandDiv.appendChild(createCardElement(card, false))); opponent.hand.forEach(card => opponentHandDiv.appendChild(createCardElement(card, true))); renderProperties(player, playerPropertiesDiv); renderProperties(opponent, opponentPropertiesDiv); player.bank.forEach(card => playerBankDiv.appendChild(createCardElement(card, false))); opponent.bank.forEach(card => opponentBankDiv.appendChild(createCardElement(card, false))); };
    const shuffleDeck = (deck) => { for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; } };
    const initializeGame = () => { gameState.deck = [...allCards]; shuffleDeck(gameState.deck); for (let i = 0; i < STARTING_HAND_SIZE; i++) { gameState.players.forEach(player => drawCards(player, 1)); } updateUI(); showNotification("Yeni Oyun Başladı!", 3000); };
    
    // --- EVENT LISTENERS & INITIALIZATION ---
    drawPileDiv.addEventListener('click', () => { if (gameState.currentPlayerIndex === 0) handleDrawPileClick() });
    playerHandDiv.addEventListener('click', (e) => { if (gameState.currentPlayerIndex === 0) handleCardInHandClick(e) });
    endTurnBtn.addEventListener('click', () => { if (gameState.currentPlayerIndex === 0) endTurn() });
    initializeGame();
});

