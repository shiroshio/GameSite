let level = 0;
let money = 10000;

const successRates = {
  0: 99.99,
  1: 99.33,
  2: 95.25,
  3: 88.07,
  4: 73.11,
  5: 62.24,
  6: 54.98,
  7: 50.00,
  8: 45.01,
  9: 37.75,
  10: 26.89,
  11: 11.92,
  12: 4.74,
  13: 1.79,
  14: 1.00,
};
const enhancementCosts = {
  0: 0,
  1: 20,
  2: 50,
  3: 100,
  4: 300,
  5: 800,
  6: 1300,
  7: 2000,
  8: 5500,
  9: 10000,
  10: 80000,
  11: 150000,
  12: 1000000,
  13: 5432109,
  14: 12345678,
};
const sellingPrices = {
  0: 0,
  1: Math.round(20*100/successRates[1] + 20),
  2: Math.round(50*100/successRates[2] + 50),
  3: Math.round(100*100/successRates[3] + 100),
  4: Math.round(300*100/successRates[4] + 300),
  5: Math.round(800*100/successRates[5] + 800),
  6: Math.round(1300*100/successRates[6] + 1300),
  7: Math.round(2000*100/successRates[7] + 2000),
  8: Math.round(5500*100/successRates[8] + 5500),
  9: Math.round(10000*100/successRates[9] + 10000),
  10: Math.round(80000*100/successRates[10] + 80000),
  11: Math.round(150000*100/successRates[11] + 150000),
  12: Math.round(1000000*100/successRates[12] + 1000000),
  13: Math.round(5432109*100/enhanceSword[13] + 5432109),
  14: Math.round(12345678*100/enhanceSword[14] + 12345678),
};
const swordImages = {
  0: 'imgs/umarung.jpg',
  1: 'imgs/hina.jpg',
  2: 'imgs/iaii.jpg',
  3: 'imgs/siro.jpg',
  4: 'imgs/morro.jpg',
  5: 'imgs/치카.jpg',
  6: 'imgs/프리렌.jpg',
  7: 'imgs/dbdp.png',
  8: 'imgs/dkfqpeh.jpg',
  9: 'imgs/ram.jpg',
  10: 'imgs/rkrcjd.jpg',
  11: 'imgs/ghen.jpg',
  12: 'imgs/emilia.jpg',
  13: 'imgs/elaina.jpg',
  14: 'imgs/arisu100.jpg'
};
const maxLevel = 14; // Set the maximum enhancement level

let fragments = 0;

function updateDisplay() {
  document.getElementById('level').textContent = level;
  document.getElementById('price').textContent = getSellingPrice();
  document.getElementById('successRate').textContent = getSuccessRate() + '%';
  document.getElementById('enhanceCost').textContent = getEnhancementCost();
  document.getElementById('totalMoney').textContent = money;
  document.getElementById('enhanceButton').disabled = money < getEnhancementCost();
  document.getElementById('fragments').textContent = fragments;
  toggleGuaranteedEnhanceButton();
  document.getElementById('enhanceButton').style.display = level < maxLevel ? 'inline' : 'none';
}

function toggleGuaranteedEnhanceButton() {
  const guaranteedButton = document.getElementById('guaranteedEnhanceButton');
  if (fragments >= 300) {
    if (!guaranteedButton) {
      const button = document.createElement('button');
      button.id = 'guaranteedEnhanceButton';
      button.textContent = '확정 강화';
      button.addEventListener('click', guaranteedEnhance);
      document.querySelector('.text-buttons-container').insertBefore(button, document.getElementById('enhanceButton').nextSibling);
    }
  } else {
    if (guaranteedButton) {
      guaranteedButton.remove();
    }
  }
}

function guaranteedEnhance() {
  if (fragments >= 300) {
    fragments -= 300;
    level++;
    alert('100% 확률로 강화에 성공하셨습니다!');
    updateDisplay();
    updateSwordImage();
  }
}

function updateSwordImage() {
  const swordImage = document.getElementById('sword');
  swordImage.src = swordImages[level];
}

function getSellingPrice() {
  return sellingPrices.hasOwnProperty(level) ? sellingPrices[level] : 0;
}

function getEnhancementCost() {
  return enhancementCosts[level];
}

function getSuccessRate() {
  return successRates[level] || 1;
}

function enhanceSword() {
  if (level < maxLevel) {
    const enhancementCost = getEnhancementCost();
    if (money >= enhancementCost) {
      money -= enhancementCost;
      const currentSuccessRate = getSuccessRate();
      if (Math.random() * 100 < currentSuccessRate) {
        if (Math.random() * 100 < 10) {
          level ++;
          level ++;
          alert('빠밤빠밤 강화에 대성공하셨습니다!!!')
        } else {
          level++;
          alert('강화에 성공하셨습니다!');
        }
      } else {
        if (Math.random() * 100 < 90){
          level = 0;
          alert('강화에 실패하셨습니다. 초기 단계로 돌아갑니다...');
        } else {
          alert('기적적인 확률로 파괴되지 안았습니다.')
        }
      }
      updateDisplay();
    } else {
      alert('강화하는데 필요한 돈이 부족합니다.');
    }
  fragments++;
  } else {
    alert('더 이상 강화 단계가 남아있지 않습니다.');
    document.getElementById('enhanceButton').style.display = 'none';
  }
  updateSwordImage();
}

document.getElementById('enhanceButton').addEventListener('click', enhanceSword);

document.getElementById('sellButton').addEventListener('click', function() {
  money += getSellingPrice();
  level = 0;
  updateDisplay();
  alert('캐릭터를 환원했습니다! 지닌 돈: $' + money);
  document.getElementById('enhanceButton').style.display = 'inline-block';
  updateSwordImage();
});

// 상점 창 토글 기능
document.getElementById('toggleShopButton').addEventListener('click', function() {
  const shopWindow = document.getElementById('shopWindow');
  shopWindow.style.display = shopWindow.style.display === 'none' ? 'block' : 'none';
});

// 인벤토리 객체를 초기화합니다.
let inventory = {};

// 인벤토리를 문자열로 변환하는 함수를 추가합니다.
function inventoryToString() {
  return Object.entries(inventory).map(([item, quantity]) => `${item} ${quantity}`).join(', ');
} 

// 인벤토리를 화면에 업데이트하는 함수를 추가합니다.
function updateInventoryDisplay() {
  const inventoryDisplay = document.getElementById('purchasedItems');
  inventoryDisplay.textContent = '구매한 아이템: ' + inventoryToString();
} 

// 아이템 구매 기능
document.querySelectorAll('.buyItemButton').forEach(button => {
  button.addEventListener('click', function() {
    const item = this.getAttribute('data-item');
    const price = parseInt(this.getAttribute('data-price'), 10);
    if (money >= price) {
      if (confirm('정말 사시겠습니까?')) {
        money -= price;
        updateMoneyDisplay();
        addItemToInventory(item);
        updateInventoryDisplay(); // 인벤토리 화면을 업데이트합니다.
      }
    } else {
      alert('돈이 부족합니다.');
    }
  });
});

// 돈 표시 업데이트
function updateMoneyDisplay() {
  document.getElementById('totalMoney').textContent = money;
} 

// 인벤토리에 아이템을 추가하는 함수를 수정합니다.
function addItemToInventory(item) {
  if (inventory[item]) {
    // 아이템이 이미 인벤토리에 있으면 수량을 증가시킵니다.
    inventory[item] += 1;
  } else {
    // 새 아이템이면 인벤토리에 추가합니다.
    inventory[item] = 1;
  }
}

updateInventoryDisplay();
updateDisplay();
