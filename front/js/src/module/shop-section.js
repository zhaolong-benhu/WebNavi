'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import catch_render_error from './catch_error';
import SwitchLayout from './switch-layout';

import {shop_section_json} from './global';
import superagent from 'superagent';

@catch_render_error
export default class ShopSection extends React.Component{
    state = {
      modules: {
        current_active:0,
        other_labels_index:0,
        left_img_items:{
          title:"",
          img:"",
          url:""
        },
        left_char_items:[],
        right_shop_items:[],
        shop_categories:[],
        other_labels:[],
        other_labels_list:[]
       }
    };
    static defaultProps = {
            shop_head_info:{icon:"/images/shop-section-icon.png",title:"实惠购物"}
    };
    constructor(){
        super();
        superagent.get(shop_section_json).set('Accept', 'application/json').end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({modules:data.modules});
            }
        }.bind(this));
    }
    shop_categories_click(index){
        var data = this.state.modules;
        data.current_active = index;
        data.right_shop_items = this.state.modules.shop_categories[index].right_shop_items;
        this.setState({modules:data});
    }
    switch_btn_click(index){
      var count = this.state.modules.other_labels_list.length;
      if (count <=0 ){
        return;
      }
      var cur_index = index;
      if (index+1 < count){
          ++cur_index;
      }else{
        cur_index = 0;
      }
      var data = this.state.modules;
      data.other_labels_index = cur_index;
      data.other_labels = this.state.modules.other_labels_list[cur_index].other_labels;
      this.setState({modules:data});
    }
    render(){
        return (
            <section className="shop-section">
                <div className="content">
                  <div className="top-content">
                      <div className="left-head">
                          <div className="icon-div">
                              <span className="icon" style={{backgroundImage:'url(' + this.props.shop_head_info.icon + ')'}}></span>
                          </div>
                          <a href="javascript:void(0)">{this.props.shop_head_info.title}</a>
                      </div>
                      <div className="right-head">
                          <div className="category">
                              {this.state.modules.shop_categories.map(function(value,index){
                                  var cl = index == this.state.modules.current_active?'active':'';
                                  return <a href="javascript:void(0)" className={cl} key={'shop_categories' + index } onClick={this.shop_categories_click.bind(this,index)}>{value.name}</a>
                              }.bind(this))}
                          </div>
                          <div className="control">
                              <div className="other-label">
                                  {this.state.modules.other_labels.map(function(value,index){
                                      return <a className={value.color} href={value.url} key={'other_labels' + index} target="_blank">{value.title}</a>
                                  })}
                              </div>
                              <div className="control-btn">
                                  <div className="switch-labels" onClick={this.switch_btn_click.bind(this,this.state.modules.other_labels_index)}>换一换</div>
                                  <SwitchLayout />
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="bottom-content">
                      <div className="items">
                          <div className="left-items" >
                              <div className="items-img">
                                  <a className="items-url theme-img-bg" href={this.state.modules.left_img_items.url} target="_blank" style={{backgroundImage:'url(' + this.state.modules.left_img_items.img + ')'}}>
                                     <span className="items-bg" ></span>
                                     <span className="items-title">{this.state.modules.left_img_items.title}</span>
                                  </a>
                              </div>
                              <div className="items-char">
                                  {this.state.modules.left_char_items.map(function(data,index){
                                    return <div className="items-char-div" key={'shop_char_items' + index} >
                                              <div className="dot-div">
                                                <span className="dot"></span>
                                              </div>
                                              <a className="items-char-title" href={data.url} target="_blank">{data.title}</a>
                                           </div>
                                  }.bind(this))}
                              </div>
                          </div>
                          <div className="right-items">
                            {this.state.modules.right_shop_items.map(function(value,index){
                              return <a className="items-url theme-img-bg" key={'shop_items_' + index} href={value.url} target="_blank" style={{backgroundImage:'url(' + value.img + ')'}}>
                                        <span className="items-bg" ></span>
                                        <span className="items-title">{value.title}</span>
                                     </a>
                            })}
                          </div>
                      </div>
                  </div>
                </div>
            </section>
        )
    }
}
