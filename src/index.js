import React from "react";
import ReactDOM from "react-dom";
import {
  AdaptivityProvider,
  ConfigProvider,
  useAdaptivity,
  AppRoot,
  SplitLayout,
  SplitCol,
  ViewWidth,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import bridge from '@vkontakte/vk-bridge';
import "./css/main.css";
bridge.send("VKWebAppInit", {});

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Привет, мир!'
);

const Example = () => {
  const { viewWidth } = useAdaptivity();

  let index = 0;

  function check(number_index) {
    let elements = document.getElementsByName(index.toString());
    if (elements.length > 0) {
      if (elements[0].classList.contains('active')) {
        bridge.send("VKWebAppFlashSetLevel", {"level": 1});
      } else {
        bridge.send("VKWebAppFlashSetLevel", {"level": 0});
      }
    }
    index += 1;
  }

  function timer() {
    if (index == 8) {
      index = 0;
    }

    setTimeout(() => {
        timer();
        check();
    }, 1000);
  }

  timer();

  function handleClick(e) {
    e.preventDefault();
    e.target.classList.toggle('active');
  }

  return (
    <AppRoot>
      <SplitLayout header={<PanelHeader separator={false} />}>
        <SplitCol spaced={viewWidth > ViewWidth.MOBILE}>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>VKUI</PanelHeader>
              <Group header={<Header mode="secondary">Items</Header>}>
                  <div class="wrapper-cards"> 
                      <div name="0" class="card" onClick={handleClick}></div>
                      <div name="1" class="card" onClick={handleClick}></div>
                      <div name="2" class="card" onClick={handleClick}></div>
                      <div name="3" class="card" onClick={handleClick}></div>
                      <div name="4" class="card" onClick={handleClick}></div>
                      <div name="5" class="card" onClick={handleClick}></div>
                      <div name="6" class="card" onClick={handleClick}></div>
                      <div name="7" class="card" onClick={handleClick}></div>
                  </div>
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <Example />
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById("root")
);
