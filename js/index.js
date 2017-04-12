"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CamperDetail = function (_React$Component) {
  _inherits(CamperDetail, _React$Component);

  function CamperDetail() {
    _classCallCheck(this, CamperDetail);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  CamperDetail.prototype.render = function render() {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "th",
        { scope: "row" },
        this.props.order
      ),
      React.createElement(
        "td",
        { className: "left-align" },
        React.createElement(
          "div",
          { className: "avatar" },
          React.createElement("img", { src: this.props.info.img })
        ),
        this.props.info.username
      ),
      React.createElement(
        "td",
        null,
        this.props.info.recent
      ),
      React.createElement(
        "td",
        null,
        this.props.info.alltime
      )
    );
  };

  return CamperDetail;
}(React.Component);

var Camperlist = function (_React$Component2) {
  _inherits(Camperlist, _React$Component2);

  function Camperlist() {
    _classCallCheck(this, Camperlist);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Camperlist.prototype.render = function render() {
    var camperInfos = undefined;
    camperInfos = this.props.campers.map(function (val, index) {
      return React.createElement(CamperDetail, { key: index, info: val, order: index + 1 });
    });
    return React.createElement(
      "tbody",
      null,
      camperInfos
    );
  };

  return Camperlist;
}(React.Component);

var Board = function (_React$Component3) {
  _inherits(Board, _React$Component3);

  function Board() {
    _classCallCheck(this, Board);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this));

    _this3.state = {
      campers: []
    };
    return _this3;
  }

  Board.prototype.reOrderRecent = function reOrderRecent() {
    $('#rencentBtn').addClass('active');
    $('#alltimeBtn').removeClass('active');
    var urls = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    this.getlist(urls);
  };

  Board.prototype.reOrderAlltime = function reOrderAlltime() {
    $('#rencentBtn').removeClass('active');
    $('#alltimeBtn').addClass('active');
    var urls = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
    this.getlist(urls);
  };

  Board.prototype.getlist = function getlist(urls) {
    $.ajax({
      url: urls,
      dataType: 'json',
      success: function (data) {
        this.setState({ campers: data });
      }.bind(this)
    });
  };

  Board.prototype.componentDidMount = function componentDidMount() {
    var urls = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    this.getlist(urls);
  };

  Board.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Leaderboard"
      ),
      React.createElement(
        "table",
        { className: "table table-bordered" },
        React.createElement(
          "thead",
          { className: "table-success" },
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              null,
              "#"
            ),
            React.createElement(
              "th",
              null,
              "Camper Name"
            ),
            React.createElement(
              "th",
              null,
              React.createElement(
                "button",
                { className: "pntbtn", id: "rencentBtn", onClick: this.reOrderRecent.bind(this) },
                "Points in past 30days"
              )
            ),
            React.createElement(
              "th",
              null,
              React.createElement(
                "button",
                { className: "pntbtn", id: "alltimeBtn", onClick: this.reOrderAlltime.bind(this) },
                "All time points"
              )
            )
          )
        ),
        React.createElement(Camperlist, { campers: this.state.campers })
      )
    );
  };

  return Board;
}(React.Component);

ReactDOM.render(React.createElement(Board, null), document.getElementById('container'));