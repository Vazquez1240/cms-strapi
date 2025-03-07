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
    description: '';
    displayName: 'Carousel';
    icon: 'landscape';
  };
  attributes: {
    imagen_carrusel: Schema.Attribute.Media<
      'files' | 'images' | 'videos',
      true
    >;
  };
}

export interface ColoresColores extends Struct.ComponentSchema {
  collectionName: 'components_colores_colores';
  info: {
    description: '';
    displayName: 'colores';
  };
  attributes: {
    color_primario: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    color_secundario: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
  };
}

export interface FooterFooter extends Struct.ComponentSchema {
  collectionName: 'components_footer_footers';
  info: {
    description: '';
    displayName: 'Footer';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
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
      'colores.colores': ColoresColores;
      'footer.footer': FooterFooter;
    }
  }
}
