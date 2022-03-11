import { TraverseDOM } from './util.js';

export class View {
  constructor() {
    this.mapWrapper = TraverseDOM.querySelector(document, 'map__wrapper');
  }

  renderRootTown(townData) {
    townData.forEach((data) => {
      const newRoot = document.createElement('div');
      newRoot.classList.add('root');
      const rootName = this.addTownName(data);
      this.addTownStyle(newRoot, data);
      this.addChildTown(newRoot, rootName, data);
      this.mapWrapper.appendChild(newRoot);
    });
  }

  renderChildTown(root, childData) {
    childData.forEach((data) => {
      const makeChild = document.createElement('div');
      makeChild.classList.add('child');
      const childName = this.addTownName(data);

      this.addChildTown(makeChild, childName, data);
      root.appendChild(makeChild);
    });
  }

  addTownStyle(el, data) {
    el.style.width = data.style.width;
    el.style.padding = data.style.padding;
  }

  addTownName(data) {
    const rootName = document.createElement('span');
    rootName.classList.add('town__name');
    rootName.innerText = data.name;
    return rootName;
  }

  addChildTown(root, name, data) {
    if (!data.child.length) {
      root.appendChild(name);
      this.addTownStyle(root, data);
      if (data.postBox.hasPostBox) {
        root.appendChild(this.addPostBox(data));
      }
    } else {
      root.appendChild(name);
      this.addTownStyle(root, data);
      if (data.postBox.hasPostBox) {
        root.appendChild(this.addPostBox(data));
      }
      this.renderChildTown(root, data.child);
    }
  }

  addPostBox(data) {
    const postBox = document.createElement('span');
    postBox.classList.add('postbox');
    postBox.dataset.postboxSize = data.postBox.size;
    postBox.innerText = '📮';
    return postBox;
  }

  addPostBoxTownText(selector, info, names) {
    info.length === 0
      ? (selector.innerText = `우체통이 존재하지 않습니다.`)
      : (selector.innerText = `우체통이 있는 곳은 ${names}, 총 ${info.length}개의 마을입니다.`);
  }

  addPostBoxSortText(selector, result) {
    selector.innerText = `우체통의 크기는 ${result} 순입니다.`;
  }

  changeBorderColor(el) {
    setTimeout(() => {
      el.parentNode.style.borderColor = 'red';
    }, 2000);
  }
}
