import React from 'react';
import {
 Container,
  Col,
  Row,
} from 'reactstrap';
import cs from './HomePage.pcss';

const placeholder = document.createElement('li');
placeholder.className = cs.placeholder;

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      items: [],
    };
  }
  hendleChange(event) {
    this.setState({ value: event.target.value });
  }
  addText(e) {
    const itemArray = this.state.items;
    if (this.state.value !== '') {
      itemArray.unshift({
        name: this.state.value,
        id: Date.now(),
        randomColor: `rgb( ${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random() * 256)} )`,
      });
    }
    this.setState({ value: '' });
    this.setState({ items: itemArray });
    e.preventDefault();
  }

  del(e) {
    const array = this.state.items;
    const index = array.indexOf(e);
    array.splice(index, 1);
    this.setState({ items: array });
  }
  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }
  dragEnd() {
    this.dragged.style.display = 'block';
    this.dragged.parentNode.removeChild(placeholder);

    const from = Number(this.dragged.dataset.id);
    let to = Number(this.over.dataset.id);
    const data = this.state.items;
    if (from < to) to -= 1;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({ items: data });
  }
  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = 'none';
    if (e.target.className === cs.placeholder) return;
    this.over = e.target;
    if (e.target.hasAttribute('data-id')) {
      e.target.parentNode.insertBefore(placeholder, e.target);
    }
  }

  renderItems() {
    const map = (item, i) => {
      return (
        <li
          data-id={i}
          style={{ backgroundColor: item.randomColor }}
          key={item.id}
          draggable="true"
          onDragEnd={this.dragEnd.bind(this)}
          onDragStart={this.dragStart.bind(this)}
        >
          <p>{item.name}</p>
          <span
            onClick={this.del.bind(this, item)}
            role="presentation"
          >x</span></li>
      );
    };

    return this.state.items.map(map);
  }

  render() {
    const container = this.state.items.length >= 7 ?
                      this.renderItems() :
      (<div className={cs.contentText}>
        Add at least 7 items to able to view and sort them.
      </div>);

    return (
      <div>
        <Container>
          <Row>
            <Col md="8" xs="12" className={cs.left}>
              <form>
                <input
                  type="text"
                  name="name"
                  onChange={this.hendleChange.bind(this)}
                  value={this.state.value}
                  className={cs.serachInput}
                  placeholder="add users"
                />
                <button
                  onClick={this.addText.bind(this)}
                  className={cs.Btn}
                >
                  Add Users
                </button>
              </form>
              <div className={cs.items}>
                <ul
                  className={cs.ul}
                  onDragOver={this.dragOver.bind(this)}
                >
                  {container}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;
