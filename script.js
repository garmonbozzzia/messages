function formatHtml() {
	//Загрузка css
	$('style').remove();
				$('head').append('<link rel="stylesheet" href="style.css" />');

	//удаляем аватар
	$(".upic").remove();
	
	//заменяем div на section в сообщаениях
	$(".msg_item").replaceWith(function (_, content) {
		var id = $(this).attr("id");
		return "<section class='message' id='" + id + "'>" + content + "</section>";
				});
	
	//добавляем отправителя и время, затем удаляем ненужное
	$(".message").each(function () {
		var txt = $(".from", this).text();
		var userName = "Julia";
		if (txt.indexOf("Юрий") > -1) {
			userName = "Yury";
		}
		$(this).addClass(userName);
		
		var time = txt.substr(txt.indexOf('@') + 2);
		$(this).prepend("<section class='time'>" + time + "</section>");
	});
	$(".from").remove();

	//замена div на section в телах сообщений
	$(".msg_body").replaceWith(function (_, content) {
		return "<section class='message_body'>" + content + "</section>";
	});

	//добавляем пустое тело сообщения если его нет 
	$(".time")
		.filter(function () {
			return !$(this).next().hasClass("message_body");
		})
		.after("<section class='message_body'></section>");
	
	//перемещаем все лишние элементы в тело сообщения
	$(".message_body").filter(function () {
		return $(this).next().length > 0;
		})
		.each(function () {
			var msgBody = $(this);
			msgBody.nextAll().each(function () {
				msgBody.append(this);
		})
	});
}

function addCollapse()
{
	//new Element("<section class='talking'></section>");
	var date = $('.time').first().text().substr(0,10);
	var $t = $("<details>", {id: date, class: "talking"});
	$t.append($("<summary>").text(date));
	$('.messages').prepend($t);
	
	$('.message').each(function(){
		//var messageDate = new Date($('.time', this).text());
		var messageDate = $('.time', this).text().substr(0,10);
		if(messageDate != date)
		{
			var $newTalking = $("<details>", {id: messageDate, class: "talking"});
			$t.after($newTalking);
			$t = $newTalking;
			date = messageDate;
			$t.append($("<summary>").text(date));
		}
		$t.append($(this));		
	});
}

function addCollapse2()
{
	//new Element("<section class='talking'></section>");
	var date = $('.time').first().text().substr(0,10);
	var $t = $("<section>", {id: date, class: "talking"});
	$('.messages').prepend($t);
	
	$('.message').each(function(){
		//var messageDate = new Date($('.time', this).text());
		var messageDate = $('.time', this).text().substr(0,10);
		if(messageDate != date)
		{
			var $newTalking = $("<section>", {id: messageDate, class: "talking"});
			$t.after($newTalking);
			$t = $newTalking;
			date = messageDate;
		}
		$t.append($(this));		
	});
}

$(function () {
	formatHtml();
	addCollapse();
})
