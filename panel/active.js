/* Поисковик стикеров в Telegram
 * Copyright (c) Гурьев Николай, 2017
 *
 * Эта программа является свободным программным обеспечением: Вы можете
 * распространять её и (или) изменять, соблюдая условия Генеральной публичной
 * лицензии GNU Affero, опубликованной Фондом свободного программного
 * обеспечения; либо редакции 3 Лицензии, либо (на Ваше усмотрение) любой
 * редакции, выпущенной позже.
 *
 * Эта программа распространяется в расчёте на то, что она окажется полезной, но
 * БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, включая подразумеваемую гарантию КАЧЕСТВА либо
 * ПРИГОДНОСТИ ДЛЯ ОПРЕДЕЛЕННЫХ ЦЕЛЕЙ.
 *
 * Ознакомьтесь с Генеральной публичной лицензией GNU Affero для получения более
 * подробной информации. Вы должны были получить копию Генеральной публичной
 * лицензии GNU Affero вместе с этой программой. Если Вы ее не получили, то
 * перейдите по адресу: <https://www.gnu.org/licenses/agpl.html>.
 *
 * Этот файл содержит клиентский сценарий для административной панели.
 */

$(function() {
  /* Метод формы. Отправляет текущую форму, используя Ajax, без перезагрузки
   * страницы по указанному в атрибуте action адресу указанным в атрибуте method
   * методом, кодируя данные указанным в атрибуте enctype способом. Работают
   * только два кодирования: application/x-www-form-urlencoded — обычная
   * стандартная отправка и text/plain — отправляется значение только первого
   * поля как простой текст. Эта функция всегда возвращает ложь для отмены
   * отправки средствами веб-обозревателя. В случае успешного ответа сервера
   * вызывается функция event.data (если поле задано), в качестве её объекта она
   * получает текущий объект настоящей функции, первый параметр будет строкой от
   * сервера. */
  function sendForm(event) {
    if (this.enctype == "application/x-www-form-urlencoded") {
      var inputData = $(this).serialize();
    } else if (this.enctype == "text/plain") {
      var inputData = $(this).find("input, textarea, select").val();
    }
    $.ajax({ url: this.action, method: this.method, contentType: this.enctype,
             data: inputData, success: event.data && event.data.bind(this) });
    return false;
  }

  $(".delete-form").submit(function() {
    /* чтобы скрыть кнопку после успешного удаления, снимаем с неё фокус */
    $(this).find("input").blur();
    $("#veil-" + this.dataset.fileId).text("Стикер удалён").addClass("shown");
  }, sendForm);
  /* событие change всё равно вызывается при попытке отправить форму, поэтому
   * повторная попытка отправки по нажатию клавиши ВВОД блокируется. */
  $(".edit-form").submit(false).change(sendForm);
});