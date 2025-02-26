import type { Schema, Struct } from '@strapi/strapi';

export interface BlockButtonBlockButtonText extends Struct.ComponentSchema {
  collectionName: 'components_block_button_block_button_texts';
  info: {
    displayName: 'BlockButtonText';
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    posicion: Schema.Attribute.Enumeration<['centro', 'izquierda', 'derecha']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'centro'>;
    texto: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlockButtonBlockButtonUrl extends Struct.ComponentSchema {
  collectionName: 'components_block_button_block_button_urls';
  info: {
    displayName: 'BlockButtonUrl';
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    posicion: Schema.Attribute.Enumeration<['centro', 'izquierda', 'derecha']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'centro'>;
    texto_button: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'https://'>;
  };
}

export interface CarouselCarousel extends Struct.ComponentSchema {
  collectionName: 'components_carousel_carousels';
  info: {
    displayName: 'Carousel';
    icon: 'landscape';
  };
  attributes: {
    descripcion: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface FooterFooter extends Struct.ComponentSchema {
  collectionName: 'components_footer_footers';
  info: {
    description: '';
    displayName: 'Footer';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    redesSociales: Schema.Attribute.JSON & Schema.Attribute.Required;
    Telefono: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 13;
      }> &
      Schema.Attribute.DefaultTo<'+52 '>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'block-button.block-button-text': BlockButtonBlockButtonText;
      'block-button.block-button-url': BlockButtonBlockButtonUrl;
      'carousel.carousel': CarouselCarousel;
      'footer.footer': FooterFooter;
    }
  }
}
