/* eslint-disable no-use-before-define */
import React from "react";
import {
  WatchList,
  MyList,
  Stock,
} from "../";
import { HOST } from "../../indicators/consts/CONST";

const Header = () => (
    <div class="col-md-12 " style={{backgroundColor:"white", paddingTop:10}}>
      <div class="col-md-4"><WatchList /></div>
      <div class="col-md-4">
        <button type="button" class="btn btn-secondary" style={{ margin: 5 }}>
          <a href={`${HOST}?analysis=RSI`}>RSI</a>
        </button>
        <button type="button" class="btn btn-secondary" style={{ margin: 5 }}>
          <a href={`${HOST}?analysis=MACD`}>MACD</a>
        </button><br />
        <button type="button" class="btn btn-secondary" style={{ margin: 5 }}>
          <a href={`${HOST}?analysis=WatchList`}>WatchList</a>
        </button>
        <button type="button" class="btn btn-secondary" style={{ margin: 5 }}>
          <a href={`${HOST}?analysis=MyList`}>MyList</a>
        </button>
        <div class="col-md-auto"><Stock /></div>
      </div>
      <div class="col-md-4"><MyList /></div>
    </div>
  );

export default Header;
