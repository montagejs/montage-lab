/* <copyright>
Copyright (c) 2012, Motorola Mobility LLC.
All Rights Reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of Motorola Mobility LLC nor the names of its
  contributors may be used to endorse or promote products derived from this
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
</copyright> */
var Montage = require("montage/core/core").Montage,
    Component = require("montage/ui/component").Component,
    Word = require("word.reel").Word;


exports.Page = Montage.create(Component, {

    _needsToMoveIndicator: {
        value: false
    },

    needsToMoveIndicator: {
       get: function () {
          return this._needsToMoveIndicator;
       },
       set: function (value) {
          if (value) {
              this.needsDraw = true;
          }
          this._needsToMoveIndicator = value;
       }
    },

    _needsToResetIndicator: {
        value: false
    },

    needsToResetIndicator: {
       get: function () {
          return this._needsToResetIndicator;
       },
       set: function (value) {
          if (value) {
              this.needsDraw = true;
          }
          this._needsToResetIndicator = value;
       }
    },

    _needsToChangeBackgroundImage: {
        value: false
    },

    indicatorData: {
        value: null
    },

    indicator: {
        value: null,
        serializable: true
    },

    words: {
        value: []
    },

	_pageData: {
		value: null
	},

    pageData: {
        set: function(val){

            if (this._pageData !== val && val != undefined ) {
                this._pageData = val;
                this.buildPage();
                this._needsToResetIndicator= true;
                this._needsToChangeBackgroundImage = true;
                this.needsDraw = true;
            }

        },
        get: function(){
            return this._pageData;
        }
    },

    prepareForDraw: {
        value: function() {
            this.eventManager.addEventListener( "moveIndicator", this, false );
            this.eventManager.addEventListener( "resetPage", this, false );
        }
    },

    handleMoveIndicator: {
        value: function(e) {
            var this_page_idx = this.pageData.pageIndex;
            var page_idx = e.detail.page_idx;

            if( this_page_idx == page_idx ){
                this.indicatorData = e.detail.data;
                this.needsToMoveIndicator = true;
            }

        }
    },

    handleResetPage: {
        value: function(e) {
            var this_page_idx = this.pageData.pageIndex;
            var page_idx = e.detail;

            if( this_page_idx == page_idx ){
                this.resetPage();
            }

        }
    },

    resetPage: {
        value: function() {
            var blocks = this.pageData.blocks;

            if( blocks ){
                for (var i=0, length = blocks.length; i < length; i++) {
                    var block = blocks[i];
                    for (var j = 0, length1 = block.words.length; j < length1; j++ ) {
                        var word = block.words[j];
                        word.flagged = false;
                    };
                };
            }
            this.needsToResetIndicator= true;
        }
    },

    draw: {
        value: function () {

            if( this._needsToChangeBackgroundImage ){
                if (this.pageData.image) {
                    this._element.style.background = "url(" + this.pageData.image + ")";
                } else {
                    this._element.style.background = "white";
                }

                this._needsToChangeBackgroundImage = false;
            }

            if( this._needsToResetIndicator )
            {

                if( this.pageData.blocks ) {
                    var data = this.pageData.blocks[0].words[0];

                    this.indicator.style.width = 0;
                    this.indicator.style.height = data.height+"px";
                    this.indicator.style.webkitTransform = 'translate3d('+data.x+'px,'+data.y+'px, 0)';

                } else {
                    this.indicator.style.width = 0;
                    this.indicator.style.height = 0;
                    this.indicator.style.webkitTransform = 'translate3d(0,0,0)';
                }

                this.indicator.style.webkitTransitionDuration = '0s';
                this.indicator.style.opacity = 0;
                this.needsToResetIndicator = false;

            }

            if( this._needsToMoveIndicator ){
                this.indicator.style.width = this.indicatorData.width+"px";
                this.indicator.style.height = this.indicatorData.height+"px";
                this.indicator.style.webkitTransform = 'translate3d('+this.indicatorData.x+'px,'+this.indicatorData.y+'px, 0)';
                this.indicator.style.webkitTransitionDuration = '.2s';
                this.indicator.style.opacity = .3;
                this.needsToMoveIndicator = false;
            }


        }
    },

    buildPage: {
        value: function() {

            this.words = [];

            if( this.pageData.blocks ){
                for (var i = 0, length = this.pageData.blocks.length; i < length; i++ ) {
                    var block = this.pageData.blocks[ i ];
                    for (var j = 0, length1 = block.words.length; j < length1; j++ ) {
                        var word = block.words[j];
                        this.words.push( word );
                    }
                }
            }

        }


    }




});
