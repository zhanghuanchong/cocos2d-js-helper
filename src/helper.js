var Cocos2dJsHelper = cc.Class.extend({
    // collision types
    COLLISION_SUCCESS: 10000,

    // events
    EVENT_DIE: 'EVENT_DIE',
    EVENT_PASS_LEVEL: 'EVENT_PASS_LEVEL',
    EVENT_PLAY: 'play',
    EVENT_GAME_OVER: 'game_over',
    EVENT_WIN_SCORE: 'win_score',

    // obstacle types

    // direction
    DIRECTION_LEFT: 'left',
    DIRECTION_RIGHT: 'right',

    // config
    CONFIG_PATH: 'config.json',
    CONFIG_DEBUG: 'debug',
    CONFIG_MAX_CHAPTER: 'max_chapter',
    CONFIG_MAX_LEVEL: 'max_level',
    CONFIG_BEST_SCORE: 'best_score',
    configDefaults: {
        best_score : {
            invalid: null,
            default: 0
        }
    },

    // constants
    SCENE_DURATION: 1,
    MAX_LEVEL_COUNT: 10000,

    // variables
    center: null,
    space: null, // Chipmunk space object
    score: 0,
    currentChapter: -1,
    currentLevel: -1,

    init: function () {
        var size = cc.winSize;
        this.center = cc.p(size.width * 0.5, size.height * 0.5);
        this.currentChapter = this.configMaxChapter();
        this.currentLevel = this.configMaxLevel();

        _.forEach(this.configDefaults, function (v, k) {
            var cv = this.config(k);
            if (cv === v.invalid) {
                this.config(k, v.default);
            }
        });
    },
    label: function (text, size) {
        return new cc.LabelTTF(text, 'Arial', size || 40);
    },
    animate: function (prefix, count, interval, revert) {
        var frames = [],
            i = 0,
            frame = null;
        if (revert) {
            for(i = count; i >= 1; i--) {
                frame = cc.spriteFrameCache.getSpriteFrame(prefix + i + '.png');
                frames.push(frame);
            }
        } else {
            for(i = 1; i <= count; i++) {
                frame = cc.spriteFrameCache.getSpriteFrame(prefix + i + '.png');
                frames.push(frame);
            }
        }
        var ani = new cc.Animation(frames, interval);
        return cc.animate(ani);
    },
    addDebugNode: function () {
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.visible = this.config(this.CONFIG_DEBUG);
        this.addChild(this._debugNode, 9999);
    },
    logColors: function (colors) {
        var result = [];
        _.forEach(colors, function (v, k) {
            result.push(cc.colorToHex(v));
        });
        cc.log(result);

        return result;
    },
    cpVerts: function (verts) {
        var result = [];
        _.forEach(verts, function (v, k) {
            result.push(v.x);
            result.push(v.y);
        });

        return result;
    },
    $v2p: function (v) {
        return cc.p(
            v.elements[0],
            v.elements[1]
        );
    },
    p2$v: function (p) {
        return $V([
            p.x,
            p.y
        ]);
    },
    rotate$v2ps: function (vs, degree, origin) {
        var result = [];
        _.forEach(vs, function (v, k) {
            result.push(util.$v2p(v.rotate(degree, origin)));
        });
        return result;
    },
    addBodyToSpace: function (body) {
        if (body.isRogue()) {
            this.space.addBody(body);
            _.forEach(body.shapeList, function (v, k) {
                this.space.addShape(v);
            }.bind(this));
        }
    },
    shadowLabel: function (text, size) {
        var label = new cc.LabelTTF(text, null, size);
        label.setFontFillColor(cc.color.WHITE);

        var offset = cc.size(5, -5);
        if (cc.sys.isNative) {
            offset = cc.size(2, -2);
        }
        label.enableShadow(cc.color.BLACK, offset, 10);

        return label;
    },
    config: function (k, v) {
        if (cc.sys.isNative) {
            var dir = jsb.fileUtils.getWritablePath();
            var path = dir + '/' + this.CONFIG_PATH;
            var jsonString = '{}';
            if (jsb.fileUtils.isFileExist(path)) {
                jsonString = jsb.fileUtils.getStringFromFile(path);
            }
            var config = JSON.parse(jsonString);
            if (v === undefined) {
                return config[k];
            }
            config[k] = v;
            jsb.fileUtils.writeStringToFile(JSON.stringify(config), path);
        } else {
            if (v === undefined) {
                v = localStorage.getItem(k);
                return JSON.parse(v);
            }
            v = JSON.stringify(v);
            localStorage.setItem(k, v);
        }
    },
    configMaxChapter: function () {
        var chapter = this.config(this.CONFIG_MAX_CHAPTER);
        if (!_.isNumber(chapter)) {
            chapter = 0;
            this.config(this.CONFIG_MAX_CHAPTER, chapter);
        }
        return chapter;
    },
    configMaxLevel: function () {
        var level = this.config(this.CONFIG_MAX_LEVEL);
        if (!_.isNumber(level)) {
            level = 0;
            this.config(this.CONFIG_MAX_LEVEL, level);
        }
        return level - this.configMaxChapter() * this.MAX_LEVEL_COUNT;
    },
    saveLevel: function (chapter, level) {
        if (chapter === undefined) {
            chapter = this.currentChapter;
        }
        if (level === undefined) {
            level = this.currentLevel;
        }

        var _chapter = this.configMaxChapter();
        if (_chapter < chapter) {
            this.config(this.CONFIG_MAX_CHAPTER, chapter);
        }
        level = chapter * this.MAX_LEVEL_COUNT + level;
        var _level = this.configMaxLevel();
        if (_level < level) {
            this.config(this.CONFIG_MAX_LEVEL, level);
        }
    },
    nextChapterAndLevel: function () {
        var levels = this.levelData[this.currentChapter].levels;
        if (levels.length - 1 > this.currentLevel) {
            return {
                chapter: this.currentChapter,
                level: this.currentLevel + 1
            };
        } else if (this.levelData.length - 1 > this.currentChapter) {
            return {
                chapter: this.currentChapter + 1,
                level: 0
            };
        }
        return {
            chapter: this.currentChapter,
            level: this.currentLevel
        };
    },
    increaseLevel: function () {
        var next = this.nextChapterAndLevel();
        if (next.chapter != this.currentChapter || next.level != this.currentLevel) {
            this.saveLevel();
            return true;
        }
        return false;
    },
    levelName: function (chapter, level) {
        if (chapter === undefined) {
            chapter = this.currentChapter;
        }
        if (level === undefined) {
            level = this.currentLevel;
        }
        return (chapter + 1) + ' - ' + (level + 1);
    }
});