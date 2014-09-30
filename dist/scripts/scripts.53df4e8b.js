(function(){"use strict";angular.module("blicblockApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","LocalStorageModule","angularMoment"]).config(["$routeProvider","localStorageServiceProvider",function(a,b){return b.setPrefix("blicblockJS"),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/test/:color_count",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}])}).call(this),function(){var a;a=function(){function a(a){this.color=a.color,this.x=a.x,this.y=a.y,this.locked=!1,this.active=!0,this.sliding=!1,this.plumetting=!1,this.id="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b,c;return b=16*Math.random()|0,c="x"===a?b:3&b|8,c.toString(16)})}return a}(),("undefined"!=typeof exports&&null!==exports?exports:this).Block=a}.call(this),function(){var a;a=function(){function a(a){this.blocks=[],this.index=a}return a.prototype.append=function(a){return this.blocks.push(a)},a}(),("undefined"!=typeof exports&&null!==exports?exports:this).BlockRow=a}.call(this),function(){"use strict";angular.module("blicblockApp").directive("ngLeft",function(){return function(a,b,c){var d;return d=void 0,b.bind("keydown keypress",function(b){return!b.which||d&&d.which===b.which?void 0:(d=b,37===b.which||"a"===String.fromCharCode(b.which)?(a.$apply(function(){return a.$eval(c.ngLeft)}),b.preventDefault()):void 0)}),b.bind("keyup",function(){return d=void 0})}})}.call(this),function(){"use strict";angular.module("blicblockApp").directive("ngRight",function(){return function(a,b,c){var d;return d=void 0,b.bind("keydown keypress",function(b){return!b.which||d&&d.which===b.which?void 0:(d=b,39===b.which||"d"===String.fromCharCode(b.which)?(a.$apply(function(){return a.$eval(c.ngRight)}),b.preventDefault()):void 0)}),b.bind("keyup",function(){return d=void 0})}})}.call(this),function(){"use strict";angular.module("blicblockApp").directive("ngDown",function(){return function(a,b,c){return b.bind("keydown keypress",function(b){return b.which&&(40===b.which||"s"===String.fromCharCode(b.which))?(a.$apply(function(){return a.$eval(c.ngDown)}),b.preventDefault()):void 0})}})}.call(this),function(){"use strict";angular.module("blicblockApp").directive("ngSpace",function(){return function(a,b,c){return b.bind("keydown keypress",function(b){return b.which&&32===b.which?(a.$apply(function(){return a.$eval(c.ngSpace)}),b.preventDefault()):void 0})}})}.call(this),function(){"use strict";angular.module("blicblockApp").service("Tetromino",["$rootScope","$interval",function(a,b){var c;return new(c=function(){function a(){this.blocks=[],this.info={cols:5,rows:7,score_value:1e3,checking:!1,in_progress:!0,plumetting_block:!1,sliding_block:!1,game_over:!1,current_score:0,tick_length_decrement_pct:.09,tick_length:1200,level:1,test_mode:!1},this.info.middle_col_idx=(this.info.cols-1)/2}return a.prototype.get_active_block=function(){return this.blocks.filter(function(a){return a.active})[0]},a.prototype.get_middle_column_blocks=function(){return this.blocks.filter(function(a){return function(b){return b.y===a.info.middle_col_idx}}(this))},a.prototype.check_for_tetrominos=function(){var a,b,c,d;if(this.info.in_progress&&!this.info.checking){for(this.info.checking=!0,d=this.blocks,b=0,c=d.length;c>b;b++)a=d[b],a&&a.locked&&!a.active&&(this.check_for_straight_tetromino(a),this.check_for_square_tetromino(a),this.check_for_l_tetromino(a),this.check_for_z_tetromino(a),this.check_for_t_tetromino(a));return this.info.checking=!1}},a.prototype.get_closest_block_to_left=function(a,b){var c;return c=this.blocks.filter(function(c){return c.x===a&&c.y<b}),c.sort(function(a,b){return a.y<b.y?-1:a.y>b.y?1:0}),c[c.length-1]},a.prototype.get_closest_block_to_right=function(a,b){var c;return c=this.blocks.filter(function(c){return c.x===a&&c.y>b}),c.sort(function(a,b){return a.y<b.y?-1:a.y>b.y?1:0}),c[0]},a.prototype.get_closest_block_below=function(a,b){var c;return c=this.blocks.filter(function(c){return c.x>a&&c.y===b}),c.sort(function(a,b){return a.x<b.x?-1:a.x>b.x?1:0}),c[0]},a.prototype.is_block_directly_below=function(a,b){return this.blocks.filter(function(c){return c.x===a+1&&c.y===b})[0]},a.prototype.plummet_block=function(a,c,d){var e,f;return f=void 0,e=function(e){return function(){return a.plumetting=!0,e.info.plumetting_block=!0,a.x<c?a.x++:a.x===c&&(b.cancel(f),f=void 0,a.locked=!0,a.active=!1,e.info.plumetting_block=!1,a.plumetting=!1,e.on_block_land(a),d)?d():void 0}}(this),e(),f=b(e,25)},a.prototype.blocks_on_top=function(a){var b,c,d,e,f;return e=function(){var c,d,e;for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(b.x);return e}(),f=function(){var c,d,e;for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(b.y);return e}(),c=Math.max.apply(Math,e),d=this.blocks.filter(function(a){return a.x<c&&f.indexOf(a.y)>-1}),d.sort(function(a,b){return a.x<b.x?1:a.x>b.x?-1:0}),d},a.prototype.drop_blocks=function(){var a,b,c,d,e,f;if(this.info.in_progress){for(e=this.blocks,f=[],c=0,d=e.length;d>c;c++)b=e[c],b&&(b.sliding||(a=b.active||!b.locked,b.x===this.info.rows-1&&a&&(b.locked=!0,b.active=!1,this.on_block_land(b)),this.is_block_directly_below(b.x,b.y)&&a&&(b.locked=!0,b.active=!1,this.on_block_land(b)),b.locked||f.push(b.x++)));return f}},a.prototype.on_block_land=function(){return this.check_for_tetrominos()},a.prototype.increment_level_if_necessary=function(){return this.info.current_score%4e3===0?this.info.level++:void 0},a.prototype.plummet_blocks=function(a,b){var c,d,e;return"undefined"==typeof b&&(b=0),c=a[b],d=this.get_closest_block_below(c.x,c.y),e=d?d.x-1:this.info.rows-1,this.plummet_block(c,e,function(c){return function(){return b<a.length-1?c.plummet_blocks(a,b+1):void 0}}(this))},a.prototype.remove_blocks=function(a){var b,c,d;if(this.info.in_progress){for(b=a.map(function(a){return a.id}),c=this.blocks.length-1;c>=0;)b.indexOf(this.blocks[c].id)>-1&&this.blocks.splice(c,1),c--;return this.info.current_score+=this.info.score_value,this.increment_level_if_necessary(),d=this.blocks_on_top(a),d=d.filter(function(a){return!a.active}),d.length>0&&this.plummet_blocks(d),this.check_for_tetrominos()}},a.prototype.lookup=function(a,b,c){return a>=this.info.rows||b>=this.info.cols?void 0:this.blocks.filter(function(d){return d.x===a&&d.y===b&&d.color===c})[0]},a.prototype.check_for_straight_tetromino=function(a){return this.check_for_straight_hor_tetromino(a),this.check_for_straight_ver_tetromino(a)},a.prototype.check_for_straight_hor_tetromino=function(a){var b,c,d,e,f,g;return g=a.y,f=a.x,e=a.color,b=this.lookup(f,g+1,e),b&&(c=this.lookup(f,g+2,e),c&&(d=this.lookup(f,g+3,e)))?this.remove_blocks([a,b,c,d]):void 0},a.prototype.check_for_straight_ver_tetromino=function(a){var b,c,d,e,f,g;return f=a.x,g=a.y,e=a.color,b=this.lookup(f+1,g,e),b&&(c=this.lookup(f+2,g,e),c&&(d=this.lookup(f+3,g,e)))?this.remove_blocks([a,b,c,d]):void 0},a.prototype.check_for_square_tetromino=function(a){var b,c,d,e,f,g;return f=a.x,g=a.y,e=a.color,b=this.lookup(f,g+1,e),b&&(c=this.lookup(f+1,g,e),c&&(d=this.lookup(f+1,g+1,e)))?this.remove_blocks([a,b,c,d]):void 0},a.prototype.check_for_l_tetromino=function(a){return this.check_for_left_l_tetromino(a),this.check_for_right_l_tetromino(a)},a.prototype.check_for_left_l_tetromino=function(a){var b,c,d,e,f,g;if(f=a.x,g=a.y,e=a.color,b=this.lookup(f+1,g,e)){if(c=this.lookup(f+2,g,e)){if(d=this.lookup(f+2,g-1,e))return this.remove_blocks([a,b,c,d]);if(d=this.lookup(f,g+1,e),!d)return;return this.remove_blocks([a,b,c,d])}if(c=this.lookup(f+1,g+1,e)){if(d=this.lookup(f+1,g+2,e),!d)return;return this.remove_blocks([a,b,c,d])}if((c=this.lookup(f,g-1,e))&&(d=this.lookup(f,g-2,e)))return this.remove_blocks([a,b,c,d])}},a.prototype.check_for_right_l_tetromino=function(a){var b,c,d,e,f,g;if(f=a.x,g=a.y,e=a.color,b=this.lookup(f+1,g,e)){if(c=this.lookup(f+2,g,e)){if(d=this.lookup(f+2,g+1,e))return this.remove_blocks([a,b,c,d]);if(d=this.lookup(f,g-1,e),!d)return;return this.remove_blocks([a,b,c,d])}if(c=this.lookup(f+1,g-1,e)){if(d=this.lookup(f+1,g-2,e),!d)return;return this.remove_blocks([a,b,c,d])}if((c=this.lookup(f,g+1,e))&&(d=this.lookup(f,g+2,e)))return this.remove_blocks([a,b,c,d])}},a.prototype.check_for_z_tetromino=function(a){var b,c,d,e,f,g;if(f=a.x,g=a.y,e=a.color,b=this.lookup(f+1,g,e)){if(c=this.lookup(f,g-1,e)){if(d=this.lookup(f+1,g+1,e),!d)return;return this.remove_blocks([a,b,c,d])}if(c=this.lookup(f,g+1,e)){if(d=this.lookup(f+1,g-1,e),!d)return;return this.remove_blocks([a,b,c,d])}if(c=this.lookup(f+1,g+1,e)){if(d=this.lookup(f+2,g+1,e),!d)return;return this.remove_blocks([a,b,c,d])}if((c=this.lookup(f+1,g-1,e))&&(d=this.lookup(f+2,g-1,e)))return this.remove_blocks([a,b,c,d])}},a.prototype.check_for_t_tetromino=function(a){var b,c,d,e,f,g;if(f=a.x,g=a.y,e=a.color,b=this.lookup(f+1,g,e)){if(c=this.lookup(f+2,g,e)){if(d=this.lookup(f+1,g+1,e))return this.remove_blocks([a,b,c,d]);if(d=this.lookup(f+1,g-1,e),!d)return;return this.remove_blocks([a,b,c,d])}if(c=this.lookup(f+1,g-1,e)){if(d=this.lookup(f+1,g+1,e),!d)return;return this.remove_blocks([a,b,c,d])}if((c=this.lookup(f,g-1,e))&&(d=this.lookup(f,g+1,e)))return this.remove_blocks([a,b,c,d])}},a}())}])}.call(this),function(){"use strict";angular.module("blicblockApp").controller("MainCtrl",["$scope","$window","$timeout","$interval","$routeParams","localStorageService","Tetromino",function(a,b,c,d,e,f,g){var h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;return a.blocks=g.blocks,a.upcoming=[],a.game_info=g.info,a.new_high_score={},n=void 0,s="high_score",a.new_game=function(){return b.location.reload()},h=["magenta","orange","yellow","green","blue","white"],e.color_count?(j=parseInt(e.color_count,10),j>h.length&&(j=h.length-1),1>j&&(j=1),k=h.slice(0,j),a.game_info.test_mode=!0):(k=h,a.game_info.test_mode&&a.new_game(),a.game_info.test_mode=!1),r=function(){var b;return a.game_info.test_mode?{value:-1e6,date:new Date(1969,0,1)}:(b=f.get(s),b?b:{})},a.existing_high_score=r(),q=function(){return k[Math.floor(Math.random()*k.length)]},i=function(){return angular.isDefined(n)?(d.cancel(n),n=void 0):void 0},u=function(){var b,c;if(!a.game_info.test_mode)return c=f.get(s),b=a.game_info.current_score,c&&c.value<b||!c?(c={value:b,date:new Date},f.set(s,c),a.new_high_score.value=c.value):void 0},p=function(){return a.game_info.in_progress=!1,a.game_info.game_over=!0,i(),u()},t=function(){return a.upcoming[1]=new Block({color:q()})},l=function(){var b,c,d,e,f;if(!a.game_info.checking){if(c=g.get_middle_column_blocks(),c.length<a.game_info.rows){if(e=0,f=a.game_info.middle_col_idx,d=a.blocks.filter(function(a){return a.x===e&&a.y===f})[0])return;return b=a.upcoming[0],b.x=e,b.y=f,a.upcoming[0]=a.upcoming[1],t(),a.blocks.push(b)}return p()}},m=function(){var a;return(a=g.get_active_block())?void 0:l()},o=function(){return!a.game_info.in_progress||a.game_info.plumetting_block||a.game_info.sliding_block?void 0:(g.drop_blocks(),m())},v=function(){return angular.isDefined(n)?void 0:n=d(o,a.game_info.tick_length)},a.upcoming.push(new Block({color:q()})),a.upcoming.push(new Block({color:q()})),a.$on("pause",function(){return a.game_info.plumetting_block?void 0:(a.game_info.in_progress=!1,i())}),a.$on("resume",function(){return a.game_info.in_progress=!0,v()}),a.$on("toggle_pause",function(){return a.game_info.in_progress?a.$emit("pause"):a.game_info.game_over?void 0:a.$emit("resume")}),w=function(b){return b.sliding=!1,a.game_info.sliding_block=!1},a.$on("move_left",function(){var b,d;if(a.game_info.in_progress&&(b=g.get_active_block(),b&&!b.plumetting&&!b.sliding&&0!==b.y))return b.sliding=!0,a.game_info.sliding_block=!0,d=g.get_closest_block_to_left(b.x,b.y),d?b.y=d.y+1:b.y--,c(function(){return w(b)},150)}),a.$on("move_right",function(){var b,d;if(a.game_info.in_progress&&(b=g.get_active_block(),b&&!b.plumetting&&!b.sliding&&b.y!==a.game_info.cols-1))return b.sliding=!0,a.game_info.sliding_block=!0,d=g.get_closest_block_to_right(b.x,b.y),d?b.y=d.y-1:b.y++,c(function(){return w(b)},150)}),a.$on("move_down",function(){var b,c,d;if(a.game_info.in_progress&&(b=g.get_active_block(),b&&!b.plumetting&&!b.sliding&&b.x!==a.game_info.rows-1))return c=g.get_closest_block_below(b.x,b.y),d=c?c.x-1:a.game_info.rows-1,g.plummet_block(b,d,function(){return i(),m(),v()})}),a.$watch("game_info.level",function(){return a.game_info.level>1&&(a.game_info.tick_length-=a.game_info.tick_length*a.game_info.tick_length_decrement_pct,i()),v()}),a.$on("$locationChangeStart",function(){return a.$emit("pause")})}])}.call(this),function(){"use strict";angular.module("blicblockApp").controller("HowToPlayModalCtrl",["$rootScope","$scope","$modal",function(a,b,c){return b.open=function(){var b,d,e;return a.$broadcast("pause"),b=c.open({templateUrl:"how-to-play-modal-content.html",controller:"HowToPlayModalInstanceCtrl"}),e=function(){return a.$broadcast("resume")},d=e,b.result.then(e,d)}}])}.call(this),function(){"use strict";angular.module("blicblockApp").controller("HowToPlayModalInstanceCtrl",["$scope","$modalInstance",function(a,b){return a.ok=function(){return b.close()},a.cancel=function(){return b.dismiss("cancel")}}])}.call(this),function(){"use strict";angular.module("blicblockApp").controller("AboutCtrl",["$scope",function(){}])}.call(this);