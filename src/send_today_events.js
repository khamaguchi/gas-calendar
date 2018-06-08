var webhook = (function(){
  var DiscordWebhook = function(id, token){
    this.id = id;
    this.token = token;
  };
  DiscordWebhook.prototype = {
    _endpoint : function(){return 'https://discordapp.com/api/webhooks/'+this.id+'/'+this.token;},
    send : function(content){
      UrlFetchApp.fetch(this._endpoint(),{'method' : 'post','payload' : {'content' : content}});
    }
  };
  var scriptProperties =  PropertiesService.getScriptProperties();
  var id = scriptProperties.getProperty('DISCORD_WEBHOOK_ID')
  var token = scriptProperties.getProperty('DISCORD_WEBHOOK_TOKEN')
  return new DiscordWebhook(
    id,
    token
  );
})();

function 　noticeTodayEvents(){
  var today = new Date();
  if (isHoliday(today)) {
    Logger.log("休日なので処理を終了します");
    return;
  }
  // TODO メールの送信先アドレス、取得するカレンダーのアドレスを変更するならここを修正
  var address = 'hamaguchi@green-lt.com';//カレンダーのアドレス・送信先アドレス
//  var cal = CalendarApp.getCalendarById(address);// アドレスからカレンダーを取得するなら
  var cal = CalendarApp.getDefaultCalendar(); // ユーザーのデフォルトのカレンダーを取得するなら

  var events = CalendarApp.getEventsForDay(today);//処理当日の予定をeventsに格納
  var eventsText = '';//本文TOP
  if (events.length > 0) {
    eventsText = '今日の予定は以下の通りです。'+'\n'+"------------------------------"+'\n';//本文TOP
    for(var i=0; i < events.length; i++){       //ループ処理　予定リストがなくなるまで
      var event = events[i];
      eventsText += i+1+'件目：'+event.getTitle()+ '\n';
      eventsText +=" 時間：";
      if (event.isAllDayEvent()) {
        eventsText += '全日\n';
      } else {
        var stime = Utilities.formatDate(event.getStartTime(), "Asia/Tokyo", "HH:mm");//予定開始時間
        var etime = Utilities.formatDate(event.getEndTime(), "Asia/Tokyo", "HH:mm");//予定終了時間
        eventsText += stime +"～"+etime+'\n';
      }
      eventsText += " 場所："+ event.getLocation()+'\n';
      eventsText += "------------------------------"+'\n';
    }
  } else {
    eventsText = '今日の予定はありません。'+'\n'+"------------------------------"+'\n';//本文TOP
  }
  // sendMessageToEmail(address, "今日の予定", eventsText);
  webhook.send(eventsText);
}

function sendMessageToEmail (address, title, message) {
  var opt = new Object();
  opt.name = title;//"今日の予定"メールの送信名・・・特になくてもいい
  opt.htmlBody = message.replace(/\r?\n/g, '<br>');//optに本文を格納 改行コード置換
  //メール送信
  MailApp.sendEmail(address,//送信先アドレス
                                '今日のあなたの予定です',//件名
                                '',//本文は空
                                opt//送信オプション

       );
}

function isHoliday(date){

  //土日か判定
  var weekInt = date.getDay();
  if(weekInt <= 0 || 6 <= weekInt){
    return true;
  }

  //祝日か判定
  var calendarId = "ja.japanese#holiday@group.v.calendar.google.com";
  var calendar = CalendarApp.getCalendarById(calendarId);
  var todayEvents = calendar.getEventsForDay(date);
  if(todayEvents.length > 0){
    return true;
  }

  return false;
}
