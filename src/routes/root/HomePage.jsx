import React from 'react';
import {
 Container,
  Col,
  Row,
} from 'reactstrap';
import cs from './HomePage.pcss';

// const placeholder = document.createElement('li');

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      items: [
        {
          name: 'John',
          id: 1517851856969,
        },
        {
          name: 'Poul',
          id: 1517851856964,
        },
        {
          name: 'Lili',
          id: 1517851856968,
        },
      ],
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
    this.over = e.target;
  }

  render() {
    const updatedList = this.state.items.filter((item) => {
      return item.name.toLowerCase().search(
        this.state.value.toLowerCase()) !== -1;
    });
    const listing = updatedList.map((item, i) =>
      (<li
        data-id={i}
        style={{ backgroundColor: `rgb( ${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random() * 256)} )` }}
        key={item.id}
        draggable="true"
        onDragEnd={this.dragEnd.bind(this)}
        onDragStart={this.dragStart.bind(this)}
      >
        <p>id: {i}</p>
        <p>Name: {item.name}</p>
        <p>Case: {item.id}</p>
        <span
          onClick={this.del.bind(this, item)}
          role="presentation"
        >x</span></li>),
    );

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
                  {listing}
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
