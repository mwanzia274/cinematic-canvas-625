export const whatsappNumber = "254796076364";
export const whatsappDisplay = "0796 076 364";

/** Build a wa.me chat link for the studio's WhatsApp number with a prefilled message. */
export const whatsappLink = (
  message = "Hello Pixel Sounds Media, I’d like to enquire about your photography and film services.",
) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
