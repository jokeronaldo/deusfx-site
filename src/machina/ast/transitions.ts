import { transform } from "motion";
// file: transitions.ts
export interface TransitionOptions {
  duration?: number;
  easing?: string;
  delay?: number;
  persistPosition?: boolean;
  syncDimensions?: boolean;
}

export class TransitionManager {
  private static defaultOptions: TransitionOptions = {
    duration: 300,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    delay: 0,
    persistPosition: true,
    syncDimensions: true,
  };

  static async fadeIn(
    element: HTMLElement,
    options?: TransitionOptions
  ): Promise<void> {
    const opts = { ...this.defaultOptions, ...options };

    // Salva estado inicial se necessário
    if (opts.persistPosition) {
      this.savePosition(element);
    }

    // Configura estado inicial
    element.style.transition = `opacity ${opts.duration}ms ${opts.easing}`;
    element.style.opacity = "0";
    element.style.display = ""; // Remove display: none se existir

    // Força reflow
    element.getBoundingClientRect();

    // Anima
    element.style.opacity = "1";

    return new Promise((resolve) => {
      setTimeout(resolve, opts.duration + opts.delay);
    });
  }

  static async fadeOut(
    element: HTMLElement,
    options?: TransitionOptions
  ): Promise<void> {
    const opts = { ...this.defaultOptions, ...options };

    element.style.transition = `opacity ${opts.duration}ms ${opts.easing}`;
    element.style.opacity = "0";

    return new Promise((resolve) => {
      setTimeout(() => {
        if (opts.persistPosition) {
          element.style.visibility = "hidden";
        } else {
          element.style.display = "none";
        }
        resolve();
      }, opts.duration + opts.delay);
    });
  }

  static async replace(
    oldElement: HTMLElement,
    newElement: HTMLElement,
    options?: TransitionOptions
  ): Promise<void> {
    const opts = { ...this.defaultOptions, ...options };
    const parent = oldElement.parentNode;

    if (!parent) return;

    swap(oldElement, {
      canOverflowX: true,
      canOverflowY: true,
      cover: true,
      fitsWidthWhenLesser: false,
      fitsHeightWhenLesser: false,
      node: newElement,
    });

    // Prepara novo elemento
    //newElement.style.opacity = "0";
    //if (opts.syncDimensions) {
    //  this.syncDimensions(oldElement, newElement);
    //}
    //
    //// Insere novo elemento
    //parent.insertBefore(newElement, oldElement.nextSibling);
    //
    //// Anima ambos
    //await Promise.all([
    //  this.fadeOut(oldElement, opts),
    //  this.fadeIn(newElement, opts),
    //]);
    //
    //// Remove antigo
    //oldElement.remove();
  }

  // 🔥 Técnica FLIP simplificada para manter posição
  private static savePosition(element: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    element.dataset.transitionX = rect.left.toString();
    element.dataset.transitionY = rect.top.toString();
    element.dataset.transitionWidth = rect.width.toString();
    element.dataset.transitionHeight = rect.height.toString();
  }

  private static syncDimensions(
    source: HTMLElement,
    target: HTMLElement
  ): void {
    const rect = source.getBoundingClientRect();
    target.style.width = `${rect.width}px`;
    target.style.height = `${rect.height}px`;
    target.style.position = "absolute";
    target.style.left = `${rect.left}px`;
    target.style.top = `${rect.top}px`;

    // Remove estilos após animação
    setTimeout(() => {
      target.style.width = "";
      target.style.height = "";
      target.style.position = "";
      target.style.left = "";
      target.style.top = "";
    }, this.defaultOptions.duration);
  }

  // Para slots/if/each
  static async toggleContent(
    container: HTMLElement,
    show: boolean,
    contentFn?: () => HTMLElement,
    options?: TransitionOptions
  ): Promise<HTMLElement | null> {
    const opts = { ...this.defaultOptions, ...options };

    if (show) {
      // Mostra conteúdo
      if (contentFn) {
        const newContent = contentFn();
        newContent.style.opacity = "0";
        container.appendChild(newContent);

        await this.fadeIn(newContent, opts);
        return newContent;
      } else if (container.firstElementChild) {
        await this.fadeIn(container.firstElementChild as HTMLElement, opts);
      }
    } else {
      // Esconde conteúdo
      if (container.firstElementChild) {
        await this.fadeOut(container.firstElementChild as HTMLElement, opts);
        container.firstElementChild.remove();
      }
    }

    return null;
  }
}

// Helpers
export const dfxTransitions = {
  fadeIn: TransitionManager.fadeIn,
  fadeOut: TransitionManager.fadeOut,
  replace: TransitionManager.replace,
  toggle: TransitionManager.toggleContent,

  // Presets
  presets: {
    smooth: { duration: 300, easing: "cubic-bezier(0.4, 0, 0.2, 1)" },
    fast: { duration: 150, easing: "ease-out" },
    slow: { duration: 500, easing: "ease-in-out" },
  },
};

const nextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(resolve));

interface ElementArriving {
  canOverflowX: boolean;
  canOverflowY: boolean;
  cover: boolean;
  fitsWidthWhenLesser: boolean;
  fitsHeightWhenLesser: boolean;
  node: HTMLElement;
}

const swap = async (goes: HTMLElement, arriving: ElementArriving) => {
  arriving.node.style.opacity = "0";

  const oldBounds = JSON.parse(JSON.stringify(goes.getBoundingClientRect()));

  const placeholder = document.createElement("div");
  placeholder.style.overflow = "hidden";
  placeholder.style.width = parseInt(oldBounds.width) + "px";
  placeholder.style.height = parseInt(oldBounds.height) + "px";

  goes.parentNode?.insertBefore(placeholder, goes);

  placeholder.appendChild(goes);
  placeholder.appendChild(arriving.node);

  // Await 2 frames for above code trully reflects on DOM
  await nextFrame();
  await nextFrame();

  const newBounds = JSON.parse(
    JSON.stringify(arriving.node.getBoundingClientRect())
  );

  goes.style.position = "absolute";
  goes.style.top = 0;
  goes.style.left = 0;

  placeholder.style.position = "relative";
  placeholder.style.overflow = "visible";

  const duration = 500;

  const placeholderAnimtation = placeholder.animate(
    [
      // Keyframes
      {
        width: parseInt(oldBounds.width) + "px",
        height: parseInt(oldBounds.height) + "px",
      },
      {
        width: parseInt(newBounds.width) + "px",
        height: parseInt(newBounds.height) + "px",
      },
    ],
    {
      // Timing options
      duration, // milliseconds
      easing: "ease-in-out",
      direction: "alternate", // reverse direction each time
    }
  );

  goes.animate(
    [
      // Keyframes
      {
        width: parseInt(oldBounds.width) + "px",
        height: parseInt(oldBounds.height) + "px",
        transform: "scale(1)",
        opacity: "1",
        filter: "blur(0)",
      },
      {
        width: parseInt(newBounds.width) + "px",
        height: parseInt(newBounds.height) + "px",
        transform: "scale(0)",
        opacity: "0",
        filter: "blur(100px)",
      },
    ],
    {
      // Timing options
      duration, // milliseconds
      easing: "ease-in-out",
      direction: "alternate", // reverse direction each time
    }
  );

  arriving.node.animate(
    [
      // Keyframes
      {
        width: parseInt(oldBounds.width) + "px",
        height: parseInt(oldBounds.height) + "px",
        transform: "scale(0.5)",
        opacity: "0",
        filter: "blur(100px)",
      },
      {
        width: parseInt(newBounds.width) + "px",
        height: parseInt(newBounds.height) + "px",
        transform: "scale(1)",
        opacity: "1",
        filter: "blur(0)",
      },
    ],
    {
      // Timing options
      duration, // milliseconds
      easing: "ease-in-out",
      direction: "alternate", // reverse direction each time
    }
  );

  placeholderAnimtation.onfinish = () => {
    arriving.node.style.opacity = "1";
    arriving.node.style.position = "relative";
    placeholder.parentNode?.insertBefore(arriving.node, placeholder);
    goes.remove();
    placeholder.remove();
  };
};
