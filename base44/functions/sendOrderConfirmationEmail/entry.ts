import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, data } = await req.json();

    // בדוק שזו הזמנה חדשה
    if (event.type !== 'create') {
      return Response.json({ status: 'skipped', reason: 'not a create event' });
    }

    // שלח מייל עם פרטי ההזמנה
    await base44.integrations.Core.SendEmail({
      to: data.employee_email,
      subject: `✅ בחירת מתנה אושרה - ${data.product_title}`,
      body: `
שלום ${data.employee_name},

🎉 בחירת המתנה שלך אושרה בהצלחה!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 פרטי ההזמנה
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

מוצר: ${data.product_title}
שווי נתפס: ₪${(data.perceived || data.consumer_price || 0).toLocaleString()}
כתובת משלוח: ${data.delivery_address || 'לא צוינה'}
הערות: ${data.notes || 'אין'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 מה הלאה?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ ההזמנה התקבלה ותעובד במהלך 1-2 ימי עסקים
✓ תקבל עדכון על משלוח המתנה
✓ המתנה תגיע תוך 10 ימי עסקים

תודה על התאמצות שלך! 🙌

---
זהו מייל אוטומטי - אל תשיב עליו
      `
    });

    return Response.json({ status: 'success', message: 'Email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});