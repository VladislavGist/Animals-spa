import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import $ from "jquery";

//redux
import {connect} from "react-redux";

//style
import "./SendAndRegistrationsTabs.sass";

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
};

class SendAndRegistrationsTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "0",
      slideIndex: 0
    };
    this.password = "";
  }

  handleChange = value => {
    this.setState({
      value: value,
    });
  }

  //функция валидации поля
  //аргументы: принимаемый элемент ввода, регулярное выражение, свойство состояния
  validate = (e, regexp, action) => {
    let el = e.target.value;

    if(el.match(regexp)) {
      [action][0](true);

    } else if(el.length === 0) {
      [action][0](" ");

    } else {
      [action][0](false);
    }
  }

  //функция валидации textarea
  validatePassword = e => {
    let regexpName = /^[a-z0-9_-]{6,18}$/;
    this.validate(e, regexpName, this.props.onValidatePassword);
  }

  //функция валидации инпута phoneNumber
  validateNumber = e => {
    let regexpName = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    this.validate(e, regexpName, this.props.onValidatePhoneNumber);
  }

  //кнопка отправить
  onHandleLogin = () => {
    if(this.props.state.sendData.login.password === true && this.props.state.sendData.login.phoneNumber === true) {
      //здесь будет запрос к серверу. если вернет true, то вызвать функцию loginTrue()
      this.props.loginTrue();

      //сохранить пользователя в localStorage

      //записать какое-либо значение в localStorage
      //если оно записано, то показывать меню пользователя
      //а если нет, то показывть меню по умолчанию
      localStorage.setItem("user", "logining");
    }
  }

  //reg name
  validateRegName = e => {
    let regexpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    this.validate(e, regexpName, this.props.onValidateRegName);
  }

  //reg phoneNumber
  validateRegPhone = e => {
    let regexpName = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    this.validate(e, regexpName, this.props.onvalidateRegPhone);
  }

  //reg password
  validateRegPassword = e => {
    let regexpName = /^[a-z0-9_-]{6,18}$/;
    this.password = e.target.value;
    this.validate(e, regexpName, this.props.onRegValidatePassword);
  }

  //reg dubl password
  validateRegDublPassword = e => {
    let regexpName = this.password;
    this.validate(e, regexpName, this.props.onRegValidateDublPassword);
  }

  //reg city
  validateRegCity = e => {
    let regexpName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    this.validate(e, regexpName, this.props.onValidateRegCity);
  }

  //reg submit btn
  handleRegBtn = () => {
    let name = this.props.state.sendData.registration.name,
        phoneNumber = this.props.state.sendData.registration.phoneNumber,
        password = this.props.state.sendData.registration.password,
        dublePassword = this.props.state.sendData.registration.dublePassword,
        city = this.props.state.sendData.registration.city;

    //если все поля true
    if(name === true && phoneNumber === true && password === true && dublePassword === true && city === true) {
      //то отправить код и показать поле
      //сделать поле видимым от state тернарным оператором
      $(".btnReg").addClass("offActive");
      $(".btnReg").click(function() {
        return false;
      })
      this.props.onCodeSent();
      this.props.onCodeElement();
      //если код введен верно, то зарегистрировать
    }
  }

  //reg code
  validateCode = e => {
    let regexpName = /\w/;
    this.validate(e, regexpName, this.props.onValidateCodeElement);
  }

  //handle code
  handleCode = () => {
    if(this.props.state.sendData.registration.code === true) {

      //запрос к серверу
      //если код верный, то
      if(5 > 4) {
        this.props.onCodeTrue();
        $(".codeBtn").addClass("offActiveCodeBtn");
        $(".codeBtn").click(function() {
          return false;
        })
        //а если нет
      } else {
        this.props.onCodeFalse();
      }
    }
  }

  render() {
    let codeElement = () => {
      return (
        <div className="btnCode">
          <TextField 
            className="inputField"
            type="text" 
            floatingLabelText="Введите код из смс" 
            name="code"
            onChange={this.validateCode}
          />
          <input type="button" value="Отправить" onClick={this.handleCode} className="codeBtn button1" />
        </div>
      );
    };

    const styles = {
      inkBarStyle: {
        backgroundColor: false
      },
      default_tab: {
        backgroundColor: "white",
        color: "#add1ed",
        height: "auto"
      },
      active_tab:{
        backgroundColor: "#2397f3",
        color: "white"
      },
      tabItemContainerStyle: {
        minHeight: "100px"
      },
      tabTemplateStyle: {
        
      }
    }

    styles.tab = [];
    styles.tab[0] = styles.default_tab;
    styles.tab[1] = styles.default_tab;
    styles.tab[this.state.slideIndex] = Object.assign({}, styles.tab[this.state.slideIndex], styles.active_tab);
    
    let handleActive = e => {
      this.setState({
        slideIndex: e.props.value
      });
    };

    //РЕГИСТРАЦИЯ
    //килкаем на кнопку
    //отправляем данные в параметре url
    //получаем ответ

    return (
      <Tabs value={this.state.value} onChange={this.handleChange} className="sendAndRegTabs" inkBarStyle={styles.inkBarStyle} contentContainerStyle={styles.tabTemplateStyle}>

        <Tab label="Войти" value="0" className="tabBtn" style={styles.tab[0]} onActive={handleActive}>
          <div>
            <form id="sendForm">

              <div className="wrapInputs">
                <TextField
                  className="inputField"
                  type="password"
                  floatingLabelText="Пароль" 
                  name="password" 
                  onChange={this.validatePassword}
                  errorText={this.props.state.sendData.login.password === true || this.props.state.sendData.login.password === " " ? "" : " "} 
                />

                <TextField
                  className="inputField"
                  type="tel" 
                  floatingLabelText="Номер телефона" 
                  name="phoneNumber" 
                  onChange={this.validateNumber}
                  errorText={this.props.state.sendData.login.phoneNumber === true || this.props.state.sendData.login.phoneNumber === " " ? "" : " "} 
                />
              </div>
              <div>
                <input type="button" value="Войти" className="button2" onClick={this.onHandleLogin} />
              </div>
              <div>
                <a href="javascript:void(0)">Забыли пароль?</a>
              </div>
            </form>
          </div>
        </Tab>

        <Tab label="Регистрация" value="1" className="tabBtn" style={styles.tab[1]} onActive={handleActive}>
          <div>
            <form id="registrationForm"> 
              <div className="wrapInputs">
                <TextField 
                  className="inputField"
                  type="text" 
                  floatingLabelText="Имя" 
                  name="name"
                  onChange={this.validateRegName}
                  errorText={this.props.state.sendData.registration.name === true || this.props.state.sendData.registration.name === " " ? "" : " "} 
                />

                <TextField
                  className="inputField"
                  type="tel"
                  floatingLabelText="Номер телефона" 
                  name="phoneNumber" 
                  onChange={this.validateRegPhone}
                  errorText={this.props.state.sendData.registration.phoneNumber === true || this.props.state.sendData.registration.phoneNumber === " " ? "" : " "} 
                />

                <TextField 
                  className="inputField"
                  type="password" 
                  floatingLabelText="Пароль" 
                  name="password" 
                  onChange={this.validateRegPassword}
                  errorText={this.props.state.sendData.registration.password === true || this.props.state.sendData.registration.password === " " ? "" : " "} 
                />

                <TextField 
                  className="inputField"
                  type="password" 
                  floatingLabelText="Повторите пароль" 
                  name="dublePassword"
                  onChange={this.validateRegDublPassword}
                  errorText={this.props.state.sendData.registration.dublePassword === true || this.props.state.sendData.registration.dublePassword === " " ? "" : " "} 
                />

                <TextField 
                  className="inputField"
                  type="text" 
                  floatingLabelText="Город" 
                  name="code" 
                  onChange={this.validateRegCity}
                  errorText={this.props.state.sendData.registration.city === true || this.props.state.sendData.registration.city === " " ? "" : " "} 
                  />
                { this.props.state.sendData.registration.codeElement === true ? codeElement() : "" }
              
              </div>
              { this.props.state.sendData.registration.info !== " " ? <p className="codeInfo">{this.props.state.sendData.registration.info}</p> : " " }
              <div>
                <input type="button" value="Зарегистрироваться" className="btnReg button2" onClick={this.handleRegBtn} />
              </div>
              <div>
                <p>Регистрируясь вы соглашаетесь с <a href="/">политикой сайта</a></p>
              </div>
            </form>
          </div>
        </Tab>

      </Tabs>
    );
  }
}

export default connect(
  state => ({state: state}),
  dispatch => ({
    loginTrue: () => {
      dispatch({type: "LOGIN_TRUE", payload: true});
    },
    onValidatePassword: e => {
      dispatch({type: "VALIDATE_PASSWORD", payload: e});
    },
    onValidatePhoneNumber: e => {
      dispatch({type: "VALIDATE_PNUMBER", payload: e});
    },
    onValidateRegName: e => {
      dispatch({type: "VALIDATE_REG_NAME", payload: e});
    },
    onvalidateRegPhone: e => {
      dispatch({type: "VALIDATE_REG_PHONENUMBER", payload: e});
    },
    onRegValidatePassword: e => {
      dispatch({type: "VALIDATE_REG_PASSWORD", payload: e});
    },
    onRegValidateDublPassword: e => {
      dispatch({type: "VALIDATE_REG_DUBL_PASSWORD", payload: e});
    },
    onValidateRegCity: e => {
      dispatch({type: "VALIDATE_REG_CITY", payload: e});
    },
    onCodeElement: e => {
      dispatch({type: "CODE_VISIBLE", payload: true});
    },
    onValidateCodeElement: e => {
      dispatch({type: "VALIDATE_CODE", payload: e})
    },
    onCodeSent: () => {
      dispatch({type: "CODE_SENT", payload: "Мы отправили на Ваш номер телефона код. Введите его для завершения регистрации. Это бесплатно и нужно для защиты ваших данных."})
    },
    onCodeTrue: () => {
      dispatch({type: "CODE_TRUE", payload: "Спасибо за регистрацию"})
    },
    onCodeFalse: () => {
      dispatch({type: "CODE_FALSE", payload: "Неверный код. Попробуйте снова"})
    }
  }))(SendAndRegistrationsTabs);

/*
при заходе состояние меню loginFalse -
после входа loginTrue

вход:
кликаю на кнопку 
данные валидируются на клиенте
отправляется запрос на сервер
получаю ответ
если пользователь существует
меняю состояние loginUser на: loginTrue

если: loginUser ==  loginFalse, то показывается кнопка "вход / регистрация"
если: loginUser == loginTrue, то показываются кнопки: имя и личный кабинет
*/